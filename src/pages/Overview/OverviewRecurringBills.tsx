//CSS
import { useComputedDataContext } from "../../contexts/ComputedDataContext"
import getTransactionsAmount from "../../utils/getTransactionsAmount"
import styles from "./Overview.module.css"
import OverviewHeader from "./OverviewHeader"
import OverviewRecurringBillsItem from "./OverviewRecurringBillsItem"

export default function OverviewRecurringBills () {

    const { paidBills, upcomingBills, dueSoonBills } = useComputedDataContext().computedData.recurringBillsCycleStatus

    const paidBillsAmount = getTransactionsAmount(paidBills)
    const upcomingBillsAmount = getTransactionsAmount(upcomingBills)
    const dueSoonBillsAmount  = getTransactionsAmount(dueSoonBills)
    
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
                    amount={paidBillsAmount}
                    key={`recurring-bills-item-paid-bills`}
                />
                <OverviewRecurringBillsItem
                    theme="var(--yellow)"
                    title="Total Upcoming"
                    amount={upcomingBillsAmount}
                    key={`recurring-bills-item-upcoming-bills`}
                />
                <OverviewRecurringBillsItem
                    theme="var(--cyan)"
                    title="Due Soon"
                    amount={dueSoonBillsAmount}
                    key={`recurring-bills-item-due-soon-bills`}
                />
            </div>
        </div>
    )
}