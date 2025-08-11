//types
type Transactions = {
            avatar: string,
            name: string,
            category: string,
            date: string,
            amount: number,
            recurring: boolean,
    }[]

export default function sortedTransactionsByDate (transactions: Transactions) {

    const sortedTransactions = transactions.sort((transactionA, transactionB) => {

        const transactionADate = new Date(transactionA.date)
        const transactionBDate = new Date(transactionB.date)

        return transactionBDate.getTime() - transactionADate.getTime()
    })

    return sortedTransactions
}