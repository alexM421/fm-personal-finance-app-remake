import getUserCycleInfos from "./GetUserCycleInfos"

//types
type Transactions = {
            avatar: string,
            name: string,
            category: string,
            date: string,
            amount: number,
            recurring: boolean,
    }[]

export default function filterTransactionsByCycle (transactions: Transactions) {

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