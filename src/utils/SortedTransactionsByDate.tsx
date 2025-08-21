//types
import type { Transaction } from "../types/DataTypes"

export default function sortedTransactionsByDate (transactions: Transaction[]) {

    const sortedTransactions = transactions.sort((transactionA, transactionB) => {

        const transactionADate = new Date(transactionA.date)
        const transactionBDate = new Date(transactionB.date)

        return transactionBDate.getTime() - transactionADate.getTime()
    })

    return sortedTransactions
}