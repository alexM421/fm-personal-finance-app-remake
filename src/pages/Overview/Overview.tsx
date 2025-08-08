//CSS
import styles from "./Overview.module.css"
//Overview
import OverviewPots from "./OverviewPots"
import OverviewTransactions from "./OverviewTransactions"

export default function Overview () {



    return(
        <div className={styles.overview}>
            <h1 className="text-preset-1">Overview</h1>
            <div className={styles["overview-stats"]}>
                <div>
                    <p className="text-preset-4">Current Balance</p>
                    <h2 className="text-preset-1">$4,836.00</h2>
                </div>
                <div>
                    <p className="text-preset-4">Income</p>
                    <h2 className="text-preset-1">$4,836.00</h2>
                </div>
                <div>
                    <p className="text-preset-4">Expenses</p>
                    <h2 className="text-preset-1">$4,836.00</h2>
                </div>
            </div>
            <div className={styles["overview-main"]}>
                <div>
                    <OverviewPots/>
                    <OverviewTransactions/>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}