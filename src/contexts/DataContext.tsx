//react
import { createContext, useContext, useEffect, useState } from "react";
//contexts
import { useAuthContext } from "./AuthContext";
//supabase
import { supabase } from "../supabaseClient";
//utils
import getCachedData from "../utils/getCachedData";
//types
import type { Data } from "../types/DataTypes";



type DataContextValue = {
    data: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>,
    loading: boolean,
}

const DataContext = createContext<DataContextValue | undefined>(undefined)

type DataProviderProps = {
    children: React.ReactNode
}

export function DataProvider ({ children }: DataProviderProps) {

    const session = useAuthContext().auth

    const emptyData = {
        personnalSettings: {
            budgetCycleDay: 1,
            preferredCurrency: "EUR",
        },
        balance: {
            current: 0,
            income: 0,
            expenses: 0,
        },
        transactions: [],
        budgets: [],
        pots: [],
        created_at: Date.toString(),
        updated_at: Date.toString(),
        user_id: "",
    }

    const [data, setData] = useState<Data>(emptyData)
    const [loading, setLoading] = useState<boolean>(true)
    
    const getData = async () => {

        const fetchUserData = async () => await supabase.from("appdata").select("*").eq("user_id", session?.user.id)
        const { data } = await fetchUserData()
        
        if(data?.length === 0){
            const { error } = await supabase.from("appdata").insert({})
            const { data } = await fetchUserData()
            return data?.[0]
        }else{
            return data?.[0]
        }
    }
    
    useEffect(() => {
        const setSupabaseData = async () => {     
            if(session){
                const cachedData = await getCachedData("data",getData)
                setData(cachedData)
                setLoading(false)
            }
        }
        setSupabaseData()
    },[session])

    const value = {
        data: data,
        setData: setData,
        loading: loading,
    }

    return(
        <DataContext.Provider value={value}>
            { children }
        </DataContext.Provider>
    )
}

export function useDataContext () {

    const context = useContext(DataContext)

    if(!context){
        throw new Error("DataContext is not defined.")
    }

    return context
    
}