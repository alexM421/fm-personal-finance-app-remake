//CSS
import GapSeparation from "../../shared/GapSeparation/GapSeparation"
import styles from "./RecurringBills.module.css"

export default function RecurringBillsSummary () {

    return(
        <div className={styles["recurring-bills-summary"]}>
            <h2 className="text-preset-3">Summary</h2>
            <div className={styles["recurring-bills-summmary-details"]}>
                <div className={styles["recurring-bills-summary-detail"]}>
                    <p className="text-preset-5">Paid Bills</p>
                    <h3 className="text-preset-5-bold">4($190.00)</h3>
                </div>
                <GapSeparation/>
                <div className={styles["recurring-bills-summary-detail"]}>
                    <p className="text-preset-5">Total Upcoming</p>
                    <h3 className="text-preset-5-bold">4($194.98)</h3>
                </div>
                <GapSeparation/>
                <div className={styles["recurring-bills-summary-detail"]}>
                    <p className="text-preset-5">Due Soon</p>
                    <h3 className="text-preset-5-bold">2($59.98)</h3>
                </div>
            </div>  
        </div>
    )
}