//CSS
import styles from "../RecurringBills.module.css"
//RecurringBillsTable
import RecurringBillsTableContent from "./RecurringBillsTableContent"
import RecurringBillsTableHeader from "./RecurringBillsTableHeader"
import RecurringBillsTableLegend from "./RecurringBillsTableLegend"
import useRecurringBillsTable from "./useRecurringBillsTable"

export default function RecurringBillsTable () {



    const {
        search, setSearch,
        selected, setSelected,
        incomeToggle, setIncomeToggle,
        recurringBills, recurringIncomes
    } = useRecurringBillsTable()

    return(
        <div className={styles["recurring-bills-table"]}>
            <RecurringBillsTableHeader
                search={search}
                setSearch={setSearch}
                selected={selected}
                setSelected={setSelected}
                incomeToggle={incomeToggle}
                setIncomeToggle={setIncomeToggle}
            />
            <div>
                <RecurringBillsTableLegend/>
                <RecurringBillsTableContent 
                    recurringBills={recurringBills}
                    recurringIncomes={recurringIncomes}
                    incomeToggle={incomeToggle}
                />
            </div>
        </div>
    )
}