//CSS
import styles from "../RecurringBills.module.css"

export default function RecurringBillsTableLegend () {

    return(
        <div className={styles["recurring-bills-table-legend"]}>
            <p className="text-preset-5">Bill Title</p>
            <p className="text-preset-5">Due Date</p>
            <p className="text-preset-5">Amount</p>
        </div>
    )
}