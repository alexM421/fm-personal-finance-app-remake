//CSS
import styles from "./Overview.module.css"

type OverviewRecurringBillsItemProps = {
    theme: string,
    title: string,
    amount: number
}

export default function OverviewRecurringBillsItem ({theme, title, amount}: OverviewRecurringBillsItemProps) {

    return(
        <div 
        className={styles["overview-recurring-bills-item"]}
        style={{boxShadow: `-4px 0px 0px ${theme}`}}
        >
            <p className="text-preset-4">{title}</p>
            <h2 className="text-preset-4-bold">${amount.toFixed(2)}</h2>
        </div>
    )
}