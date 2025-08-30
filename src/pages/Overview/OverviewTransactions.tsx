//CSS
import styles from "./Overview.module.css"
//Overview
import OverviewTransaction from "./OverviewTransaction"
//context
import { useDataContext } from "../../contexts/DataContext"
//utils
import sortedTransactionsByDate from "../../utils/SortedTransactionsByDate"
import OverviewHeader from "./OverviewHeader"

export default function OverviewTransactions () {

    const { data } = useDataContext()
    const sortedTransactions = sortedTransactionsByDate(data.transactions).slice(0,5)
    const transactionsElements = sortedTransactions
        
        .flatMap((transaction,index) => {
            const { name, amount, date, avatar, currency } = transaction

            const tranasctionDate = new Date(date)
            
            const formattedDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit", 
            month: "short",  
            year: "numeric"  
            }).format(tranasctionDate)

            const key = `transaction_${date}_${name}`
            const borderKey=`transaction_border_${date}_${name}`

            return(
                index!==4
                ?[
                    <OverviewTransaction
                        name={name}
                        avatar= {avatar}
                        amount={amount}
                        date={formattedDate}
                        currency={currency}
                        key={key}
                    />
                    ,
                    <div className={styles["transactions-border"]} key={borderKey}></div>
                ]
                :<OverviewTransaction
                        name={name}
                        avatar= {avatar}
                        amount={amount}
                        date={formattedDate}
                        currency={currency}
                        key={key}
                />
            )
        })

    return(
        <div className={styles["overview-transactions"]}>
            <OverviewHeader
                title="Transactions"
                link="/transactions"
                btnDesc="View All"
            />
            <div className={styles["overview-transactions-main"]}>
                {transactionsElements}
            </div>
        </div>
    )
}