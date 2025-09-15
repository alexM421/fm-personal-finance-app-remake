import { useEffect } from "react";
import { useDataContext } from "../contexts/DataContext";
import { useDateContext } from "../contexts/DateContext";
import getDueDate from "../utils/getDueDate";
import type { Transaction } from "../types/DataTypes";
import syncUserData from "../utils/syncUserData";
import getChangeRate from "../utils/getChangeRate";
import { useCurrencyContext, type Currency } from "../contexts/CurrencyContext";

export default function useSyncBill () {

    const { data, setData } = useDataContext()
    const rates = useCurrencyContext()
    const { bills, transactions } = data
    const { date } = useDateContext()
    const { preferredCurrency } = data.personnalSettings
    const todayDate = date?.datetime || Date.now()
    
    //goal is on startup, to refresh dueDate for each bill, and if dueDate<Date, create Transaction and move due Date
    useEffect(() => {

        let newTransactionsArr = []
        const billsTransactions = [...transactions].filter(transaction => transaction?.billId)
        const billsArr = [...bills]
        let billsChanged = false

        for(let bill of bills){
            
            const { period, dueDate, id } = bill

            //updates every transactions to match the bill category and name every time
            billsTransactions
                .forEach((transaction, index, array) => {
                    if(transaction.billId === id){
                        array[index] = {...transaction, name: bill.name, category: bill.category, avatar: bill.avatar}
                        return
                    }else{
                        return 
                    }
                })

            const dateObj = new Date(todayDate)
            let dueDateLoop = dueDate

            //update transactions array for new transactions
            while(new Date(dueDateLoop).getTime()<dateObj.getTime()){
                //First add new transaction
                const newTransaction: Transaction = {
                    avatar: bill.avatar,
                    name: bill.name,
                    category: bill.category,
                    date: dueDateLoop.slice(0,16),
                    amount: bill.amount,
                    recurring: true,
                    currency: bill.currency,
                    id: crypto.randomUUID(),
                    rate: rates? getChangeRate(bill.currency as Currency, preferredCurrency, rates):1,
                    billId: bill.id
                }
                if(!bill.isSuspended){
                    newTransactionsArr.push(newTransaction)
                }
                dueDateLoop =  getDueDate(dueDateLoop, period)
          
            }

            if(dueDateLoop !== dueDate){
                billsChanged = true
                const updatedBill = {...bill, dueDate: dueDateLoop.slice(0,16)}
                const indexOfUpdatedBill = bills.findIndex(billData => billData.id === updatedBill.id)
                billsArr.splice(indexOfUpdatedBill,1,updatedBill)
            }
        }

        const needUpdate = JSON.stringify(billsTransactions) !== JSON.stringify(billsTransactions)

        if(newTransactionsArr.length>0 || billsChanged || needUpdate){
            
            const transactionsWithoutBills = transactions.filter(transaction => !transaction?.billId)

            const updatedData = {
                ...data,
                transactions: [...transactionsWithoutBills, ...newTransactionsArr, ...billsTransactions],
                bills: billsArr
            }
            syncUserData(updatedData, setData)
        }

    },[bills])

}