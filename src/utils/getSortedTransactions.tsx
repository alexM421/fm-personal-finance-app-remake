type Sortable = {
    date : string,
    name: string,
    amount: number,
}

export default function getSortedTransactions<T extends Sortable>(transactions: T[], sort: string):T[] {

    const sorted = transactions.sort((transactionA, transactionB) => {

        const transactionADate = new Date(transactionA.date)
        const transactionBDate = new Date(transactionB.date)
        

        switch (sort) {
            case "Latest":
                return transactionBDate.getTime() - transactionADate.getTime()
            case "Oldest":
                return transactionADate.getTime() - transactionBDate.getTime()
            case "A to Z":
                return transactionA.name.localeCompare(transactionB.name)
            case "Z to A":
                return transactionB.name.localeCompare(transactionA.name)
            case "Highest":
                return transactionB.amount - transactionA.amount
            case "Lowest":
                return transactionA.amount - transactionB.amount
            default: 
                return 1
        }
    })

    return sorted
} 