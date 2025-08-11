//utils
import type { Transaction } from "../contexts/DataContext"
import getUserCycleInfos from "./getUserCycleInfos"
//types
export default function filterTransactionsByCycle (transactions: Transaction[], year: number, month: number, datetime: string, budgetCycleDay: number) {

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