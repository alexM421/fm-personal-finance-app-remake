//CSS
import styles from "./Transactions.module.css"
//components
import PageHeader from "../../components/PageHeader/PageHeader"
//shared
import Search from "../../shared/Search/Search"
import CustomSelect from "../../shared/CustomSelect/CustomSelect"
//react
import { useState } from "react"
//context
import { useDataContext } from "../../contexts/DataContext"

export default function Transactions () {

    const transactions = useDataContext().data.transactions

    const [search, setSearch] = useState<string>("")
    const [sortSelect, setSortSelect] = useState<string>("Latest")
    const [categorySelect, setCategorySelect] = useState<string>("All Transactions")

    const categories = ["All Transactions","Entertainment","Bills","Groceries","Dining Out","Transportation","Personal Care","Education","Lifestyle","Shopping","General"]
    const sortOptions = ["Latest","Oldest","A to Z","Z to A","Highest","Lowest"]

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
                    <div className={styles["transactions-grid-main"]}>
        
                    </div>
                </div>
                <div className={styles["transactions-pagination"]}>
                    
                </div>
            </div>
        </div>
    )
}