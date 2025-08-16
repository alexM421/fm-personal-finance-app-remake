//CSS
import styles from "./Transactions.module.css"
//types
import type { Transaction } from "../../contexts/DataContext"

type TransactionitemProps = {
    transaction: Transaction
}



export default function TransactionItem ({ transaction }: TransactionitemProps) {

    const { amount, avatar, category, date, name } = transaction

    const sign = amount<0? "-":"+"
    const transactionDate = new Date(date)

    const stringDate = transactionDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })

    return(
        <div className={styles["transaction-item"]}>
            <div className={styles["transaction-item-profile"]}>
                <img src={avatar}/>
                <h2 className="text-preset-4-bold">{name}</h2>
            </div>
            <p className="text-preset-5">{category}</p>
            <p className="text-preset-5">{stringDate}</p>
            <h2
                className="text-preset-4-bold" 
                style={{color: amount<0
                    ?"var(--grey-900)"
                    :"var(--green)"
                }}
            >{`${sign}$${Math.abs(amount).toFixed(2)}`}</h2>
        </div>
    )
}