import GetCurrentDate from "./GetCurrentDate"

//types
type Transactions = {
            avatar: string,
            name: string,
            category: string,
            date: string,
            amount: number,
            recurring: boolean,
    }[]

export default async function FilterTransactionsByCycle (transactions: Transactions) {

    const currentDate = await GetCurrentDate()
    
    const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date)
    })


    return ""
}