//utils
import type { Transaction } from "../types/DataTypes"
import getUserCycleInfos from "./getUserCycleInfos"
//types
export default function filterTransactionsByCycle (transactions: Transaction[], datetime: string, budgetCycleDay: number) {

    const date = new Date(datetime)

    const year = date.getFullYear()
    const month =  date.getMonth()

    const userCycleData = getUserCycleInfos(year, month, datetime, budgetCycleDay)

    if(!userCycleData){
        return []
    }

    const { userCycleStartDate, userCycleEndDate } = userCycleData

    const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date)
        if(
            transactionDate.getTime()<=userCycleEndDate.getTime()
            && transactionDate.getTime()>=userCycleStartDate.getTime()
        ){
            return true
        }else{
            return false
        }
    })

    return filteredTransactions
}