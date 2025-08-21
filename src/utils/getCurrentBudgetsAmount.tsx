import type { Budget, Transaction } from "../types/DataTypes"

export default function getCurrentBudgetsAmount (budgets: Budget[], budgetedTransactions: Transaction[]) {

    const budgetsAmount = budgets.map(budget => {
        
        let category = budget.category
        let amount = 0

        for(let transaction of budgetedTransactions){
            if(transaction.category === category){
                amount+= transaction.amount
            }
        }

        return {
            ...budget,
            amount: amount
        }

    })
    
    return budgetsAmount
}