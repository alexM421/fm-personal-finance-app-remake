//CSS
import styles from "./Budgets.module.css"
//utils
import formatNumber from "../../utils/formatNumber"
//contexts
import { useDataContext } from "../../contexts/DataContext"
//types
import type { BudgetAmount } from "../../contexts/ComputedDataContext"
import ColorBar from "../../shared/ColorBar/ColorBar"

type BudgetSpendingProps = {
    budget: BudgetAmount
}

export default function BudgetSpending ({ budget }: BudgetSpendingProps) {

    const { category, theme, amount, maximum } = budget
    const { data: { personnalSettings: { preferredCurrency }}} = useDataContext()


    return(
        <div className={styles["budget-spending"]}>
            <div>
                <ColorBar theme={theme} height="20px"/>
                <p className="text-preset-4">{category}</p>
            </div>
            <div>
                <p className="text-preset-3">{formatNumber(Math.abs(amount), preferredCurrency, false)}</p>
                <p className="text-preset-5">{`of ${formatNumber(maximum, preferredCurrency, false)}`}</p>
            </div>
        </div>
    )
}