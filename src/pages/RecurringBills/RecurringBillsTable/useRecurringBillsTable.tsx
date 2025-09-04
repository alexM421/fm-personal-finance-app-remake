//react
import { useState } from "react"
//contexts
import { useDataContext } from "../../../contexts/DataContext"
//utils
    import getSortedTransactions from "../../../utils/getSortedTransactions"
//types
import type { Bill } from "../../../types/DataTypes"

export default function useRecurringBillsTable () {

    const { data: { bills }} = useDataContext()

    const [search, setSearch] = useState<string>("")
    const [selected, setSelected] = useState<string>("Latest")

    const filteredTransactions = bills.filter(bill => bill.name.toLowerCase().includes(search.toLowerCase()))
    const recurringBills = getSortedTransactions<Bill>(filteredTransactions, selected)

    return {
        search, setSearch,
        selected, setSelected,
        recurringBills
    }
}