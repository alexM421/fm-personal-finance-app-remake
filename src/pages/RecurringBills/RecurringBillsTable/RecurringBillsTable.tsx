//CSS
import { useDataContext } from "../../../contexts/DataContext"
import styles from "../RecurringBills.module.css"
import RecurringBillsTableContent from "./RecurringBillsTableContent"
//RecurringBillsTable
import RecurringBillsTableHeader from "./RecurringBillsTableHeader"
import RecurringBillsTableLegend from "./RecurringBillsTableLegend"
import useRecurringBillsTable from "./useRecurringBillsTable"

export default function RecurringBillsTable () {



    const {
        search, setSearch,
        selected, setSelected,
        recurringBills
    } = useRecurringBillsTable()

    return(
        <div className={styles["recurring-bills-table"]}>
            <RecurringBillsTableHeader
                search={search}
                setSearch={setSearch}
                selected={selected}
                setSelected={setSelected}
            />
            <div>
                <RecurringBillsTableLegend/>
                <RecurringBillsTableContent 
                    recurringBills={recurringBills}
                />
            </div>
        </div>
    )
}