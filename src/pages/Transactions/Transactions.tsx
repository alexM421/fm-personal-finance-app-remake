//CSS
import styles from "./Transactions.module.css"
//components
import PageHeader from "../../components/PageHeader/PageHeader"
//shared
import Search from "../../shared/Search/Search"
import CustomSelect from "../../shared/CustomSelect/CustomSelect"
//react
import { useEffect, useRef, useState } from "react"
//context
import { useDataContext } from "../../contexts/DataContext"
import getFilteredTransactions from "./getFilteredTransactions"
import getSortedTransactions from "./getSortedTransactions"
import TransactionItem from "./TransactionItem"
import GapSeparation from "../../shared/GapSeparation/GapSeparation"
import TransactionsPagination from "./TransactionsPagination"

export default function Transactions () {

    const transactions = useDataContext().data.transactions

    const [search, setSearch] = useState<string>("")
    const [sortSelect, setSortSelect] = useState<string>("Latest")
    const [categorySelect, setCategorySelect] = useState<string>("All Transactions")
    const [selectedPage, setSelectedPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)

    const categories = ["All Transactions","Entertainment","Bills","Groceries","Dining Out","Transportation","Personal Care","Education","Lifestyle","Shopping","General"]
    const sortOptions = ["Latest","Oldest","A to Z","Z to A","Highest","Lowest"]

    const filteredTransactions = getFilteredTransactions(transactions, categorySelect, search)
    const sortedAndFilteredTransactions = getSortedTransactions(filteredTransactions, sortSelect)
    const selectedPageTransactions = sortedAndFilteredTransactions.slice((selectedPage-1)*10, selectedPage*10)

    useEffect(() => {
        setSelectedPage(1)
    },[search, sortSelect, categorySelect])

    const gridMainRef = useRef<HTMLDivElement | null>(null)

    const gridMainHeight = gridMainRef.current?.clientHeight
    console.log(gridMainHeight)

    return(
        <div className={styles.transactions}>
            <PageHeader
                pageTitle="Transactions"
                btnTxt="+ Add New Transaction"
            />
            <div className={styles["transactions-main"]}>
                <div className={styles["transactions-header"]}>
                    <Search
                        search={search}
                        setSearch={setSearch}
                        placeholder="Search transaction"
                    />
                    <div className={styles["transactions-selectors"]}>
                        <div className={`${styles["transactions-selector"]} ${styles["sort-selector"]}`}>
                            <p className="text-preset-4">Sort by</p>
                            <CustomSelect
                                selected={sortSelect}
                                setSelected={setSortSelect}
                                options={sortOptions}
                            />
                        </div>
                        <div className={`${styles["transactions-selector"]} ${styles["category-selector"]}`}>
                            <p className="text-preset-4">Category</p>
                            <CustomSelect
                                selected={categorySelect}
                                setSelected={setCategorySelect}
                                options={categories}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles["transactions-grid"]}>
                    <div className={styles["transactions-grid-header"]}>
                        <p className="text-preset-5">Recipient / Sender</p>
                        <p className="text-preset-5">Category</p>
                        <p className="text-preset-5">Transaction Date</p>
                        <p className="text-preset-5">Amount</p>
                    </div>
                    <div className={styles["transactions-grid-main"]} ref={gridMainRef}>
                        {selectedPageTransactions.flatMap((transaction, index) => 
                            index===selectedPageTransactions.length-1
                            ?<TransactionItem
                                transaction={transaction}
                            />
                            :[<TransactionItem
                                transaction={transaction}
                            />,
                                <GapSeparation/>
                            ]
                            )}
                    </div>
                </div>
                <TransactionsPagination
                    filteredData={sortedAndFilteredTransactions}
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                />
            </div>
        </div>
    )
}