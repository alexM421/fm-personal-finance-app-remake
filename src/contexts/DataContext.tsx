import { createContext, useContext, useState } from "react";
import  SampleData  from "../../data.json"


export type Data = {
    personnalSettings: {
        budgetCycleDay: number,
    },
    balance: {
        current: number,
        income: number,
        expenses: number,
    },
    transactions: {
            avatar: string,
            name: string,
            category: string,
            date: string,
            amount: number,
            recurring: boolean,
    }[],
    budgets: 
        {
            category: string,
            maximum: number,
            theme: string,
        }[],
    pots: 
        {
            name: string,
            target: number,
            total: number,
            theme: string,
        }[]
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

    const [data, setData] = useState<Data>(SampleData)

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