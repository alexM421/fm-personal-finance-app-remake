//React
import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
//context
import { useDataContext, type Budget, type Transaction } from "./DataContext";
import filterTransactionsByCycle from "../utils/filterTransactionsByCycle";
import getCurrentBudgetsAmount from "../utils/getCurrentBudgetsAmount";

export type BudgetAmount = Budget & {
        amount: number
}

export type ComputedData = {
    currentCycleTransactions: Transaction[],
    budgetedTransactions: Transaction[],
    budgetsAmount: BudgetAmount[],
}

type ComputedDataContextValue = {
    computedData: ComputedData,
    setComputedData: Dispatch<SetStateAction<ComputedData>>
}

const ComputedDataContext = createContext<ComputedDataContextValue | undefined>(undefined)

type ComputedDataProviderProps = {
    children: ReactNode
}

export function ComputedDataProvider ({ children }:ComputedDataProviderProps) {

    const  { data } = useDataContext()

    const [computedData, setComputedData] = useState<ComputedData>({
        currentCycleTransactions: [],
        budgetedTransactions: [],
        budgetsAmount: [],
    })

    useEffect(() => {

        const currentCycleTransactions = filterTransactionsByCycle(data.transactions)
        const budgetedTransactions = currentCycleTransactions.filter(transaction => transaction.amount<0)
        const budgetsAmount = getCurrentBudgetsAmount(data.budgets, budgetedTransactions)
       
        setComputedData({
            currentCycleTransactions: currentCycleTransactions,
            budgetedTransactions: budgetedTransactions,
            budgetsAmount: budgetsAmount
        })

    },[])

    const value = {
        computedData: computedData,
        setComputedData: setComputedData
    }

    return(
        <ComputedDataContext.Provider value={value}>
            { children }
        </ComputedDataContext.Provider>
    )
}


export function useComputedDataContext () {

    const context = useContext(ComputedDataContext)

    if(!context){
        throw new Error("ComputedDataContext is undefined!")
    }

    return context

}