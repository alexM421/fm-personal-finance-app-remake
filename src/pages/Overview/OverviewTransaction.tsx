//CSS
import styles from "./Overview.module.css"

type OverviewTransactionsProps = {
    avatar: string,
    name: string,
    amount: number,
    date: string,
}

export default function OverviewTransaction ({ avatar, name, amount, date}: OverviewTransactionsProps) {

    const amountSign = amount<0? "-":"+"
    const amountAbs = Math.abs(amount).toFixed(2)
    const amountString = `${amountSign}$${amountAbs}`

    return(
        <div className={styles["overview-transaction"]}>
            <div className={styles["overview-transaction-profile"]}>
                <img src={avatar} alt="avatar image"/>
                <h3 className="text-preset-4-bold">{name}</h3>
            </div>
            <div className={styles["overview-transaction-infos"]}>
                <h3 
                    className="text-preset-4-bold" 
                    style={
                        {color: amount<0
                            ?"var(--grey-900)"
                            :"var(--green)"
                        }
                    }>{amountString}</h3>
                <p className="text-preset-5">{date}</p>
            </div>
        </div>
    )
}