//CSS
import styles from "./Overview.module.css"
//Overview
import OverviewLinkButton from "./OverviewLinkButton"
import OverviewTransaction from "./OverviewTransaction"
//context
import { useDataContext } from "../../contexts/DataContext"
//utils
import SortedTransactionsByDate from "../../utils/SortedTransactionsByDate"

export default function OverviewTransactions () {

    const { data } = useDataContext()
    const sortedTransactions = SortedTransactionsByDate(data).slice(0,5)
    const transactionsElements = sortedTransactions
        
        .flatMap((transaction,index) => {
            const { name, amount, date, avatar } = transaction

            const tranasctionDate = new Date(date)
            
            const formattedDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit", 
            month: "short",  
            year: "numeric"  
            }).format(tranasctionDate)

            return(
                index!==4
                ?[
                    <OverviewTransaction
                        name={name}
                        avatar= {avatar}
                        amount={amount}
                        date={formattedDate}
                    />
                    ,
                    <div className={styles["transactions-border"]}></div>
                ]
                :<OverviewTransaction
                        name={name}
                        avatar= {avatar}
                        amount={amount}
                        date={formattedDate}
                />
            )
        })

    return(
        <div className={styles["overview-transactions"]}>
            <div className={styles["overview-transactions-header"]}>
                <h2 className="text-preset-2">Transactions</h2>
                <OverviewLinkButton link="/transactions">See Details</OverviewLinkButton>
            </div>
            <div className={styles["overview-transactions-main"]}>
                {transactionsElements}
            </div>
        </div>
    )
}