//CSS
import styles from "./Overview.module.css"
//Overview
import OverviewLinkButton from "./OverviewLinkButton"
import OverviewTransaction from "./OverviewTransaction"

export default function OverviewTransactions () {



    return(
        <div className={styles["overview-transactions"]}>
            <div className={styles["overview-transactions-header"]}>
                <h2 className="text-preset-2">Transactions</h2>
                <OverviewLinkButton link="/transactions">See Details</OverviewLinkButton>
            </div>
            <div className={styles["overview-transactions-main"]}>
                <OverviewTransaction
                    name="Emma Richardson"
                    avatar= "/assets/images/avatars/bytewise.jpg"
                    amount={75.50}
                    date="19 Aug 2024"
                />
            </div>
        </div>
    )
}