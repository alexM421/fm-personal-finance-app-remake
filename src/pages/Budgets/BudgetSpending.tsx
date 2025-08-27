//CSS
import styles from "./Budgets.module.css"
//types
import type { BudgetAmount } from "../../contexts/ComputedDataContext"

type BudgetSpendingProps = {
    budget: BudgetAmount
}

export default function BudgetSpending ({ budget }: BudgetSpendingProps) {

    const { category, theme, amount, maximum } = budget

    return(
        <div className={styles["budget-spending"]}>
            <div>
                <div className={styles["theme-bar"]} style={{backgroundColor: theme}}></div>
                <p className="text-preset-4">{category}</p>
            </div>
            <div>
                <p className="text-preset-3">{amount}</p>
                <p className="text-preset-5">{`of $${maximum.toFixed(2)}`}</p>
            </div>
        </div>
    )
}