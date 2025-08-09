//types
import type { Data } from "../contexts/DataContext"

export default function SortedTransactionsByDate (data: Data) {

    const transactions = data.transactions

    const sortedTransactions = transactions.sort((transactionA, transactionB) => {

        const transactionADate = new Date(transactionA.date)
        const transactionBDate = new Date(transactionB.date)

        return transactionBDate.getTime() - transactionADate.getTime()
    })

    return sortedTransactions
}