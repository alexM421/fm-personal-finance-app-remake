//types
import type { Currency } from "../contexts/CurrencyContext"
import type { Budget, Transaction } from "../types/DataTypes"

export default function getCurrentBudgetsAmount (
    budgets: Budget[],
    budgetedTransactions: Transaction[],
    convertFunction: (    
        toConvertAmount: number, 
        originalCurrency: Currency
    ) => number
) {

    const budgetsAmount = budgets.map(budget => {
        
        let category = budget.category
        let amount = 0

        for(let transaction of budgetedTransactions){
            if(transaction.category === category){
                amount+= convertFunction(transaction.amount, transaction.currency as Currency)
            }
        }

        return {
            ...budget,
            amount: amount
        }

    })
    
    return budgetsAmount
}