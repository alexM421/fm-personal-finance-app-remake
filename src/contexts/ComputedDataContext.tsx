//React
import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
//context
import { useDataContext, type Budget, type Transaction } from "./DataContext";
import filterTransactionsByCycle from "../utils/filterTransactionsByCycle";
import getCurrentBudgetsAmount from "../utils/getCurrentBudgetsAmount";
import { useDateContext } from "./DateContext";

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
    const { date } = useDateContext()

    const [computedData, setComputedData] = useState<ComputedData>({
        currentCycleTransactions: [],
        budgetedTransactions: [],
        budgetsAmount: [],
    })

    useEffect(() => {

        if(date){
            const { year, month, datetime } = date
            const { transactions, budgets } = data
            const { budgetCycleDay } = data.personnalSettings
            const currentCycleTransactions = filterTransactionsByCycle(transactions, year, month, datetime, budgetCycleDay )
            
            const budgetedTransactions = currentCycleTransactions.filter(transaction => {
                const isExpense = transaction.amount < 0
                const isBudget = budgets.some(budget => budget.category === transaction.category)

                return isBudget && isExpense
            })
            const budgetsAmount = getCurrentBudgetsAmount(data.budgets, budgetedTransactions)
           
        

            setComputedData({
                currentCycleTransactions: currentCycleTransactions,
                budgetedTransactions: budgetedTransactions,
                budgetsAmount: budgetsAmount
            })
        }

    },[data, date])

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