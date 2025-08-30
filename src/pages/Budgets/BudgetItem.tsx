//CSS
import styles from "./Budgets.module.css"
//types
import type { BudgetAmount } from "../../contexts/ComputedDataContext"
import BudgetItemHeader from "./BudgetItemHeader"
import BudgetItemSpending from "./BudgetItemSpending"
import BudgetItemLatest from "./BudgetItemLatest"

type BudgetItemProps = {
    budget: BudgetAmount
}

export default function BudgetItem ({ budget }: BudgetItemProps) {

    const { theme, category, maximum, amount } = budget

    return(
        <div className={styles["budget-item"]}>
            <BudgetItemHeader
                budget={budget}  
            />
            <BudgetItemSpending
                theme={theme}
                maximum={maximum}
                amount={amount}
            />
            <BudgetItemLatest
                category={category}
            />
        </div>
    )
}