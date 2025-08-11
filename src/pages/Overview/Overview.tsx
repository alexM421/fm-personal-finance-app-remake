//CSS
import { useDataContext } from "../../contexts/DataContext"
import formatNumber from "../../utils/formatNumber"
import styles from "./Overview.module.css"
import OverviewBudgets from "./OverviewBudgets"
//Overview
import OverviewPots from "./OverviewPots"
import OverviewRecurringBills from "./OverviewRecurringBills"
import OverviewTransactions from "./OverviewTransactions"

export default function Overview () {

    const { current, income, expenses } = useDataContext().data.balance

     

    return(
        <div className={styles.overview}>
            <h1 className="text-preset-1">Overview</h1>
            <div className={styles["overview-stats"]}>
                <div>
                    <p className="text-preset-4">Current Balance</p>
                    <h2 className="text-preset-1">${formatNumber(current)}</h2>
                </div>
                <div>
                    <p className="text-preset-4">Income</p>
                    <h2 className="text-preset-1">${formatNumber(income)}</h2>
                </div>
                <div>
                    <p className="text-preset-4">Expenses</p>
                    <h2 className="text-preset-1">${formatNumber(expenses)}</h2>
                </div>
            </div>
            <div className={styles["overview-main"]}>
                <div>
                    <OverviewPots/>
                    <OverviewTransactions/>
                </div>
                <div>
                    <OverviewBudgets/>
                    <OverviewRecurringBills/>
                </div>
            </div>
        </div>
    )
}