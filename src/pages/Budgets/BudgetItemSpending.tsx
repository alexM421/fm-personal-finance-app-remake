//CSS
import { useDataContext } from "../../contexts/DataContext"
import ColorBar from "../../shared/ColorBar/ColorBar"
import formatNumber from "../../utils/formatNumber"
import styles from "./Budgets.module.css"

type BudgetItemSpendingProps = {
    theme: string,
    maximum: number,
    amount: number
}

export default function BudgetItemSpending ({ theme, maximum, amount }: BudgetItemSpendingProps) {

    const preferredCurrency = useDataContext().data.personnalSettings.preferredCurrency

    const spent = Math.abs(amount)
    const remaining = maximum-spent<0? 0: maximum-spent

    const ratio = spent > maximum 
        ? "100%"
        : `${(spent/maximum)*100}%`

    return(
        <div className={styles["budget-item-spending"]}>
            <p className="text-preset-4">Maximum of {formatNumber(maximum, preferredCurrency, false)}</p>
            
            <div className={styles["budget-item-filling-bar-ext"]}>
                <div 
                    className={styles["budget-item-filling-bar-int"]}
                    style={{
                        backgroundColor: theme,
                        width: ratio
                    }}
                ></div>
            </div>
            
            <div className={styles["budget-item-status"]}>
                <div className={styles["budget-item-status-item"]}>
                    <ColorBar theme={theme} height="43px"/>
                    <div>
                        <p className="text-preset-5">Spent</p>
                        <p className="text-preset-4-bold">{formatNumber(spent, preferredCurrency, false)}</p>
                    </div>
                </div>
                <div className={styles["budget-item-status-item"]}>
                    <ColorBar theme="var(--beige-100)" height="43px"/>
                    <div>
                        <p className="text-preset-5">Remaining</p>
                        <p className="text-preset-4-bold">{formatNumber(remaining, preferredCurrency, false)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}