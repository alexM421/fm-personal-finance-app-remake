//React
import { useEffect, useRef, useState } from "react"
//contexts
import { useDataContext } from "../../contexts/DataContext"
import { useComputedDataContext } from "../../contexts/ComputedDataContext"
//utils
import getFilteredTransactions from "./getFilteredTransactions"
import getSortedTransactions from "../../utils/getSortedTransactions"

export default function useTransactionsData () {

    const transactions = useDataContext().data.transactions
    const { currentCycleTransactions } = useComputedDataContext().computedData

    const [search, setSearch] = useState<string>("")
    const [sortSelect, setSortSelect] = useState<string>("Latest")
    const [categorySelect, setCategorySelect] = useState<string>("All Transactions")
    const [showCycleOnly, setShowCycleOnly] = useState<boolean>(false)
    const [selectedPage, setSelectedPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)

    const filteredTransactions = getFilteredTransactions(showCycleOnly? currentCycleTransactions:transactions, categorySelect, search)
    const sortedAndFilteredTransactions = getSortedTransactions(filteredTransactions, sortSelect)
    const selectedPageTransactions = sortedAndFilteredTransactions.slice((selectedPage-1)*perPage, selectedPage*perPage)

    useEffect(() => {
        setSelectedPage(1)
    },[search, sortSelect, categorySelect, showCycleOnly])

    const gridMainRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        
        const gridMainHeight = gridMainRef.current?.clientHeight
        const gridItemHeight = 40 + 16*2 + 1;
        
        const handleGridHeight = () => {
            if(!gridMainHeight){
                setPerPage(0)
            }else{
                
                const numberOfGridItemPerPage = Math.floor((gridMainHeight - 40)/gridItemHeight) + 1
                setPerPage(numberOfGridItemPerPage)
            }
        }

        handleGridHeight() 
        window.addEventListener("resize", handleGridHeight)

        return () => window.removeEventListener("resize", handleGridHeight)
    },[])

    return { 
        search, setSearch, 
        showCycleOnly, setShowCycleOnly,
        sortSelect, setSortSelect,
        categorySelect, setCategorySelect,
        gridMainRef,
        selectedPageTransactions,
        sortedAndFilteredTransactions,
        selectedPage, setSelectedPage,
        perPage
    }
}