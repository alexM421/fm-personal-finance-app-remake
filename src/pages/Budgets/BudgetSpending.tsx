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
                <div className={styles["theme-bar"]}></div>
                <p>{category}</p>
            </div>
            <div>
                <p>{amount}</p>
                <p>{`of $${maximum.toFixed(2)}`}</p>
            </div>
        </div>
    )
}