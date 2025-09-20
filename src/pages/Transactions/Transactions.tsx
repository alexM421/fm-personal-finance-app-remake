//CSS
import styles from "./Transactions.module.css"
//components
import PageHeader from "../../components/PageHeader/PageHeader"
//shared
import Search from "../../shared/Search/Search"
import CustomSelect from "../../shared/CustomSelect/CustomSelect"
import GapSeparation from "../../shared/GapSeparation/GapSeparation"
import ToggleBtn from "../../shared/ToggleBtn/ToggleBtn"
//react
import { useState } from "react"
//transactions
import TransactionItem from "./TransactionItem"
import TransactionsPagination from "./TransactionsPagination"
import useTransactionsData from "./useTransactionsData"
//modals
import ModalLayout from "../../modals/ModalLayout/ModalLayout"
import TransactionModal from "../../modals/TransactionModal/TransactionModal"
import useMobileListener from "../../hooks/useMobileListener"

export default function Transactions () {

    const [showModal, setShowModal] = useState<boolean>(false)

    const categories = ["All Transactions","Entertainment","Bills","Groceries","Dining Out","Transportation","Personal Care","Education","Lifestyle","Shopping","General"]
    const sortOptions = ["Latest","Oldest","A to Z","Z to A","Highest","Lowest"]

    const { 
        search, setSearch, 
        showCycleOnly, setShowCycleOnly,
        sortSelect, setSortSelect,
        categorySelect, setCategorySelect,
        gridMainRef,
        selectedPageTransactions,
        sortedAndFilteredTransactions,
        selectedPage, setSelectedPage,
        perPage
    } = useTransactionsData()

    const { isMobile } = useMobileListener(700)

    return(
        <>
            <div className={styles.transactions}>
                <PageHeader
                    pageTitle="Transactions"
                    btnTxt={isMobile? "New":"+ Add New Transaction"}
                    toggleState={setShowModal}
                />
                <div className={styles["transactions-main"]}>
                    <div className={styles["transactions-header"]}>
                        <div>
                            <Search
                                search={search}
                                setSearch={setSearch}
                                placeholder="Search transaction"
                            />
                            <div className={styles["transactions-toggle"]}>
                                {!isMobile &&<p className="text-preset-4" style={{fontWeight: !showCycleOnly? "700":"400"}}>All</p>}
                                <ToggleBtn
                                    setState={setShowCycleOnly}
                                    state={showCycleOnly}
                                    id="transaction-table-toggle"
                                />
                                {!isMobile && <p className="text-preset-4" style={{fontWeight: showCycleOnly? "700":"400"}}>Cycle</p>}
                            </div>
                        </div>
                        <div className={styles["transactions-selectors"]}>
                            <div className={`${styles["transactions-selector"]} ${styles["sort-selector"]}`}>
                                {!isMobile && <p className="text-preset-4">Sort by</p>}
                                <CustomSelect
                                    selected={sortSelect}
                                    setSelected={setSortSelect}
                                    options={sortOptions}
                                    hasSearch={false}
                                />
                            </div>
                            <div className={`${styles["transactions-selector"]} ${styles["category-selector"]}`}>
                                {!isMobile && <p className="text-preset-4">Category</p>}
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
                        {!isMobile && <div className={styles["transactions-grid-header"]}>
                            <p className="text-preset-5">Recipient / Sender</p>
                            <p className="text-preset-5">Category</p>
                            <p className="text-preset-5">Transaction Date</p>
                            <p className="text-preset-5">Amount</p>
                        </div>}
                        <div className={styles["transactions-grid-main"]} ref={gridMainRef}>
                            {selectedPageTransactions.flatMap((transaction, index) => 
                                index===selectedPageTransactions.length-1
                                ?<TransactionItem
                                    transaction={transaction}
                                    key={`transaction-${transaction.id}`}
                                    isMobile={isMobile}
                                />
                                :[<TransactionItem
                                    transaction={transaction}
                                    key={`transaction-${transaction.id}`}
                                    isMobile={isMobile}
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