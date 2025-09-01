import type { Transaction } from "../types/DataTypes"

export default function getRecurringBillsCycleStatus (transactions: Transaction[], currentCycleTransactions: Transaction[], datetime: string) {

    const currentDate = new Date(datetime)

    const recurringTransactions = currentCycleTransactions.filter(transaction => transaction.recurring)
    
    const paidBills = recurringTransactions.filter(transaction => {

        const transactionDate = new Date(transaction.date)

        return transactionDate.getTime() <= currentDate.getTime()
    })

    const upcomingBills = recurringTransactions.filter(transaction => {

        const tranasctionDate = new Date(transaction.date)

        return tranasctionDate.getTime() > currentDate.getTime()
    })

    const dueSoonBills = transactions.filter(transaction => {

        const isRecurring = transaction.recurring
        
        
        const weekIntoMs = 7*24*60*60*1000
        const transactionDate = new Date(transaction.date)

        const isUpcoming = transactionDate.getTime() > currentDate.getTime()
        const dateDiff = transactionDate.getTime() - currentDate.getTime()

        const isWithinOneWeek = 
            isUpcoming 
            && dateDiff < weekIntoMs
    
        return isRecurring && isWithinOneWeek
    })

    return {
        paidBills: paidBills,
        upcomingBills: upcomingBills,
        dueSoonBills: dueSoonBills
    }

}