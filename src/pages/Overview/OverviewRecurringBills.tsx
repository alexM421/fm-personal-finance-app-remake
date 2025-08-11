//CSS
import styles from "./Overview.module.css"
import OverviewHeader from "./OverviewHeader"
import OverviewRecurringBillsItem from "./OverviewRecurringBillsItem"

export default function OverviewRecurringBills () {




    return(
        <div className={styles["overview-recurring-bills"]}>
            <OverviewHeader
                title="Recurring Bills"
                link="/recurring-bills"
                btnDesc="See Details"
            />
            <div className={styles["overview-recurring-bills-main"]}>
                <OverviewRecurringBillsItem
                    theme="var(--green)"
                    title="Paid Bills"
                    amount={180}
                />
                <OverviewRecurringBillsItem
                    theme="var(--yellow)"
                    title="Total Upcoming"
                    amount={195}
                />
                <OverviewRecurringBillsItem
                    theme="var(--cyan)"
                    title="Due Soon"
                    amount={60}
                />
            </div>
        </div>
    )
}