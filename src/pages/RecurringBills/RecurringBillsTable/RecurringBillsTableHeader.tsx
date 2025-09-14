//CSS
import styles from "../RecurringBills.module.css"
//shared
import CustomSelect from "../../../shared/CustomSelect/CustomSelect"
import Search from "../../../shared/Search/Search"

type RecurringBillsTableHeaderProps = {
    search: string,
    selected: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    setSelected: React.Dispatch<React.SetStateAction<string>>
}

export default function RecurringBillsTableHeader ({ search, setSearch, selected, setSelected }: RecurringBillsTableHeaderProps) {

    const sortOptions = ["Latest","Oldest","A to Z","Z to A","Highest","Lowest"]

    return(
        <div className={styles["recurring-bills-table-header"]}>
            <Search
                search={search}
                setSearch={setSearch}
                placeholder="Search Bills"
            />
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