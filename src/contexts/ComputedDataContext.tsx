//React
import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
//context
import { useDataContext } from "./DataContext";
import filterTransactionsByCycle from "../utils/FilterTransactionsByCycle";
import getCurrentBudgetsAmount from "../utils/getCurrentBudgetsAmount";
import { useDateContext } from "./DateContext";
import getRecurringBillsCycleStatus from "../utils/getRecurringBillsCycleStatus";
import type { Budget, Transaction } from "../types/DataTypes";
import useGetConvertedMoney from "../hooks/useGetConvertedMoney";

export type BudgetAmount = Budget & {
        amount: number
}

export type recurringBillsCycleStatus = {
    paidBills: Transaction[],
    upcomingBills: Transaction[],
    dueSoonBills: Transaction[]
}

export type ComputedData = {
    currentCycleTransactions: Transaction[],
    budgetedTransactions: Transaction[],
    budgetsAmount: BudgetAmount[],
    recurringBillsCycleStatus: recurringBillsCycleStatus
    
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

    const getConvertedMoney = useGetConvertedMoney()

    const [computedData, setComputedData] = useState<ComputedData>({
        currentCycleTransactions: [],
        budgetedTransactions: [],
        budgetsAmount: [],
        recurringBillsCycleStatus: {
            paidBills: [],
            upcomingBills: [],
            dueSoonBills: []
        }
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
            const budgetsAmount = getCurrentBudgetsAmount(data.budgets, budgetedTransactions, getConvertedMoney)
            
            const recurringBillsCycleStatus = getRecurringBillsCycleStatus(transactions, currentCycleTransactions, datetime)

            setComputedData({
                currentCycleTransactions: currentCycleTransactions,
                budgetedTransactions: budgetedTransactions,
                budgetsAmount: budgetsAmount,
                recurringBillsCycleStatus: recurringBillsCycleStatus,
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