//types
import type { Budget, Transaction } from "../types/DataTypes"
import roundNumber2Decimals from "./roundNumber2Decimals"

export default function getCurrentBudgetsAmount (
    budgets: Budget[],
    budgetedTransactions: Transaction[]
) {

    const budgetsAmount = budgets.map(budget => {
        
        let category = budget.category
        let amount = 0

        for(let transaction of budgetedTransactions){
            if(transaction.category === category){
                console.log(transaction)
                amount+= roundNumber2Decimals(transaction.amount * transaction.rate)
            }
        }

        return {
            ...budget,
            amount: amount
        }

    })
    
    return budgetsAmount
}