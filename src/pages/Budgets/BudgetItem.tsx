//CSS
import styles from "./Budgets.module.css"
//types
import type { BudgetAmount } from "../../contexts/ComputedDataContext"

type BudgetItemProps = {
    budget: BudgetAmount
}

export default function BudgetItem ({ budget }: BudgetItemProps) {

    return(
        <div className={styles["budget-item"]}>
               
        </div>
    )
}