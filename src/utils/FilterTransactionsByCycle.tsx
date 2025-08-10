//utils
import type { Transaction } from "../contexts/DataContext"
import getUserCycleInfos from "./getUserCycleInfos"
//types
export default function filterTransactionsByCycle (transactions: Transaction[]) {

    const userCycleData = getUserCycleInfos()

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