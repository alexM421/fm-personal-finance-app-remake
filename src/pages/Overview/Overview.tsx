//CSS
import { useState } from "react"
import IconSettings from "../../assets/IconSettings"
import { useDataContext } from "../../contexts/DataContext"
import Button from "../../shared/Button/Button"
import formatNumber from "../../utils/formatNumber"
import styles from "./Overview.module.css"
import OverviewBudgets from "./OverviewBudgets"
//Overview
import OverviewPots from "./OverviewPots"
import OverviewRecurringBills from "./OverviewRecurringBills"
import OverviewTransactions from "./OverviewTransactions"

export default function Overview () {

    const { current, income, expenses } = useDataContext().data.balance

    const { data: { personnalSettings: { preferredCurrency }}} = useDataContext()
     
    const [settingsDisplay, setSettingsDisplay] = useState(false)

    return(
        <>
            <div className={styles.overview}>
                <div className={styles["overview-header"]}>
                    <h1 className="text-preset-1">Overview</h1>
                    <Button onClick={() => setSettingsDisplay(true)}><IconSettings/></Button>
                </div> 
                <div className={styles["overview-stats"]}>
                    <div>
                        <p className="text-preset-4">Current Balance</p>
                        <h2 className="text-preset-1">{formatNumber(current, preferredCurrency, false)}</h2>
                    </div>
                    <div>
                        <p className="text-preset-4">Income</p>
                        <h2 className="text-preset-1">{formatNumber(income, preferredCurrency, false)}</h2>
                    </div>
                    <div>
                        <p className="text-preset-4">Expenses</p>
                        <h2 className="text-preset-1">{formatNumber(expenses, preferredCurrency, false)}</h2>
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
        </>
    )
}