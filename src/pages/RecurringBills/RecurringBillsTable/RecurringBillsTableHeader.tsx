//CSS
import styles from "../RecurringBills.module.css"
//shared
import CustomSelect from "../../../shared/CustomSelect/CustomSelect"
import Search from "../../../shared/Search/Search"
import ToggleBtn from "../../../shared/ToggleBtn/ToggleBtn"

type RecurringBillsTableHeaderProps = {
    search: string,
    selected: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    setSelected: React.Dispatch<React.SetStateAction<string>>,
    incomeToggle: boolean,
    setIncomeToggle: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RecurringBillsTableHeader ({ search, setSearch, selected, setSelected, setIncomeToggle, incomeToggle }: RecurringBillsTableHeaderProps) {

    const sortOptions = ["Latest","Oldest","A to Z","Z to A","Highest","Lowest"]

    return(
        <div className={styles["recurring-bills-table-header"]}>
            <Search
                search={search}
                setSearch={setSearch}
                placeholder="Search Bills"
            />
            <div className={styles["recurring-bills-table-header-toggle"]}>
                <p 
                    className="text-preset-4"
                    style={{fontWeight: incomeToggle? 400:700}}
                >Bills</p>
                <ToggleBtn
                    setState={setIncomeToggle}
                    state={incomeToggle}
                    id="recurring-bills-toggle"
                />
                <p 
                    className="text-preset-4"
                    style={{fontWeight: incomeToggle? 700:400}}
                >Incomes</p>
            </div>
            <div className={styles["recurring-bills-table-header-select"]}>
                <p className="text-preset-4">Sort by</p>
                <CustomSelect
                    selected={selected}
                    setSelected={setSelected}
                    options={sortOptions}
                    hasSearch={false}
                />
            </div>
        </div>
    )
}