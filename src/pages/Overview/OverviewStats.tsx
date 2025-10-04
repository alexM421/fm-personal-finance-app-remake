//CSS
import styles from "./Overview.module.css"
//utils
import formatNumber from "../../utils/formatNumber";
//contexts
import { useDataContext } from "../../contexts/DataContext";

export default function OverviewStats () {

    const { data: { personnalSettings : { originalBalance, preferredCurrency }}, data:{ transactions, pots }} = useDataContext()

    const income = transactions
        .filter(transaction => transaction.amount>0)
        .reduce((acc, transaction) => acc + transaction.amount*transaction.rate, 0)

    const expenses = transactions
        .filter(transaction => transaction.amount<0)
        .reduce((acc, transaction) => acc + transaction.amount*transaction.rate, 0)

    const savings = pots
        .reduce((acc, pot) => acc + pot.total, 0)

    const balance = originalBalance + income + expenses - savings

    return(
        <div className={styles["overview-stats"]}>
            <div>
                <p className="text-preset-4">Current Balance</p>
                <h2 className="text-preset-1">{formatNumber(balance, preferredCurrency, false)}</h2>
            </div>
            <div>
                <p className="text-preset-4">Income</p>
                <h2 className="text-preset-1">{formatNumber(income, preferredCurrency, false)}</h2>
            </div>
            <div>
                <p className="text-preset-4">Expenses</p>
                <h2 className="text-preset-1">{formatNumber(Math.abs(expenses), preferredCurrency, false)}</h2>
            </div>
        </div>
    )
}