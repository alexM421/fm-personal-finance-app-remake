//CSS
import styles from "./Overview.module.css"
//context
import { useDataContext } from "../../contexts/DataContext"
import formatNumber from "../../utils/formatNumber"

type OverviewRecurringBillsItemProps = {
    theme: string,
    title: string,
    amount: number
}

export default function OverviewRecurringBillsItem ({theme, title, amount}: OverviewRecurringBillsItemProps) {

    const { data: { personnalSettings: { preferredCurrency }}} = useDataContext()

    return(
        <div 
        className={styles["overview-recurring-bills-item"]}
        style={{boxShadow: `-4px 0px 0px ${theme}`}}
        >
            <p className="text-preset-4">{title}</p>
            <h2 className="text-preset-4-bold">{formatNumber(amount, preferredCurrency, false)}</h2>
        </div>
    )
}