//react
import { createContext, useContext, useEffect, useState } from "react";
//data
import  SampleData  from "../../data.json"
//contexts
import { useAuthContext } from "./AuthContext";
//supabase
import { supabase } from "../supabaseClient";
//utils
import getCachedData from "../utils/getCachedData";

export type PersonnalSettings = {
    budgetCycleDay: number,
    preferredCurrency: string,
}

export type Balance = {
    current: number,
    income: number,
    expenses: number,
}
export type Transaction = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean,
  currency: string,
}

export type Budget = {
  category: string,
  maximum: number,
  theme: string,
}

export type Pot = {
  name: string,
  target: number,
  total: number,
  theme: string,
}

export type Data = {
    personnalSettings: PersonnalSettings,
    balance: Balance,
    transactions: Transaction[],
    budgets: Budget[],
    pots: Pot[],
}

type DataContextValue = {
    data: Data;
    setData: React.Dispatch<React.SetStateAction<Data>>
}

const DataContext = createContext<DataContextValue | undefined>(undefined)

type DataProviderProps = {
    children: React.ReactNode
}

export function DataProvider ({ children }: DataProviderProps) {

    const session = useAuthContext().auth

    const [data, setData] = useState<Data>(SampleData)
    
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
            }
        }
        setSupabaseData()
    },[session])

    const value = {
        data: data,
        setData: setData
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