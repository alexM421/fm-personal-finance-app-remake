//CSS
import styles from "./RecurringBills.module.css"

export default function RecurringBillsTotal () {


    return(
        <div className={styles["recurring-bills-total"]}>
            <img src="/assets/images/icon-recurring-bills.svg"/>
            <div>
                <p className="text-preset-4">Total Bills</p>
                <h2 className="text-preset-1">$384.98</h2>
            </div>
        </div>
    )
}