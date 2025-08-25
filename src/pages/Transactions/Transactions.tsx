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
import { useComputedDataContext } from "../../contexts/ComputedDataContext"
import ToggleBtn from "../../shared/ToggleBtn/ToggleBtn"
import ModalLayout from "../../modals/ModalLayout/ModalLayout"
import AddTransactionModal from "../../modals/TransactionModal/TransactionModal"
import TransactionModal from "../../modals/TransactionModal/TransactionModal"

export default function Transactions () {

    const transactions = useDataContext().data.transactions
    const { currentCycleTransactions } = useComputedDataContext().computedData

    const [search, setSearch] = useState<string>("")
    const [sortSelect, setSortSelect] = useState<string>("Latest")
    const [categorySelect, setCategorySelect] = useState<string>("All Transactions")
    const [showCycleOnly, setShowCycleOnly] = useState<boolean>(false)
    const [selectedPage, setSelectedPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)
    const [showModal, setShowModal] = useState<boolean>(false)

    const categories = ["All Transactions","Entertainment","Bills","Groceries","Dining Out","Transportation","Personal Care","Education","Lifestyle","Shopping","General"]
    const sortOptions = ["Latest","Oldest","A to Z","Z to A","Highest","Lowest"]

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

    return(
        <>
            <div className={styles.transactions}>
                <PageHeader
                    pageTitle="Transactions"
                    btnTxt="+ Add New Transaction"
                    toggleState={setShowModal}
                />
                <div className={styles["transactions-main"]}>
                    <div className={styles["transactions-header"]}>
                        <Search
                            search={search}
                            setSearch={setSearch}
                            placeholder="Search transaction"
                        />
                        <div className={styles["transactions-selectors"]}>
                            <div className={styles["transactions-toggle"]}>
                                <p className="text-preset-4" style={{fontWeight: !showCycleOnly? "700":"400"}}>All</p>
                                <ToggleBtn
                                    setState={setShowCycleOnly}
                                    state={showCycleOnly}
                                />
                                <p className="text-preset-4" style={{fontWeight: showCycleOnly? "700":"400"}}>Cycle</p>
                            </div>
                            <div className={`${styles["transactions-selector"]} ${styles["sort-selector"]}`}>
                                <p className="text-preset-4">Sort by</p>
                                <CustomSelect
                                    selected={sortSelect}
                                    setSelected={setSortSelect}
                                    options={sortOptions}
                                    hasSearch={false}
                                />
                            </div>
                            <div className={`${styles["transactions-selector"]} ${styles["category-selector"]}`}>
                                <p className="text-preset-4">Category</p>
                                <CustomSelect
                                    selected={categorySelect}
                                    setSelected={setCategorySelect}
                                    options={categories}
                                    hasSearch={false}
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
                                    key={`transaction-${transaction.id}`}
                                />
                                :[<TransactionItem
                                    transaction={transaction}
                                    key={`transaction-${transaction.id}`}
                                />,
                                    <GapSeparation
                                    key={`transaction-${transaction.id}-gap-separation`}
                                    />
                                ]
                                )}
                        </div>
                    </div>
                    <TransactionsPagination
                        filteredData={sortedAndFilteredTransactions}
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage}
                        perPage={perPage}
                    />
                </div>
            </div>
            <ModalLayout
                modalTitle="Add New Transaction"
                modalDesc="Adding a new transaction"
                modalDisplay={showModal}
                closeModalDisplay={() => setShowModal(false)}
            >
                <TransactionModal
                    closeModalDisplay={() => setShowModal(false)}
                />
            </ModalLayout>
        </>
    )
}