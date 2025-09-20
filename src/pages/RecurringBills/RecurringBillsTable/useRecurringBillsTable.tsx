//react
import { useState } from "react"
//contexts
import { useDataContext } from "../../../contexts/DataContext"
//utils
    import getSortedTransactions from "../../../utils/getSortedTransactions"
import getBillPaidStatus from "./getBillPaidStatus"
import { useDateContext } from "../../../contexts/DateContext"
//types
export default function useRecurringBillsTable () {

    const { data: { bills }} = useDataContext()
    const { date } = useDateContext()
    const datetime = date?.datetime || new Date().toISOString().slice(0,16)

    const [search, setSearch] = useState<string>("")
    const [selected, setSelected] = useState<string>("Latest")
    const [incomeToggle, setIncomeToggle] = useState<boolean>(false)

    const filteredBills = bills.filter(bill => bill.name.toLowerCase().includes(search.toLowerCase()))
    const sortableBills = filteredBills.map(bill => ({...bill, date: bill.dueDate}))

    if(selected==="Latest" || selected==="Oldest"){
        
        const paidBills = sortableBills.filter(bill => {
            const { isPaid } = getBillPaidStatus(datetime, bill.dueDate, bill.period)
            return isPaid
        })
    
        const unpaidBills = sortableBills.filter(bill => {
            const { isPaid } = getBillPaidStatus(datetime, bill.dueDate, bill.period)
            return !isPaid
        })
 
        const sortedPaidBills = getSortedTransactions(paidBills, selected)
        const sortedUnpaidBills = getSortedTransactions(unpaidBills, selected)
    
        const recurringBillsArr = selected==="Oldest"
            ?[...sortedPaidBills, ...sortedUnpaidBills]
            :[...sortedUnpaidBills, ...sortedPaidBills]

        const recurringIncomes = recurringBillsArr.filter(bill => bill.status === "Income")
        const recurringBills = recurringBillsArr.filter(bill => bill.status==="Bill")

        return {
            search, setSearch,
            selected, setSelected,
            incomeToggle, setIncomeToggle,
            recurringBills, recurringIncomes
        }      
    
    }else{

        const recurringBillsArr = getSortedTransactions(sortableBills, selected)
        const recurringIncomes = recurringBillsArr.filter(bill => bill.status === "Income")
        const recurringBills = recurringBillsArr.filter(bill => bill.status==="Bill")

        return {
            search, setSearch,
            selected, setSelected,
            incomeToggle, setIncomeToggle,
            recurringBills, recurringIncomes
        }
    }

}