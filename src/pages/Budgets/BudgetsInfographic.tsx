//CSS
import styles from "./Budgets.module.css"
//shared
import Infographic from "../../shared/Infographic/Infographic"
//types
import type { BudgetAmount } from "../../contexts/ComputedDataContext"
import BudgetSpending from "./BudgetSpending"

type BudgetsInfographicProps = {
    budgets: BudgetAmount[]
}

export default function BudgetsInfographic ({ budgets }: BudgetsInfographicProps) {


    return(
        <div className={styles["budgets-infographic"]}>
            <Infographic/>
            <div className={styles["budgets-spendings"]}>
                <h1>Spending Summary</h1>
                <div>
                    {budgets.map(budget => <BudgetSpending budget={budget}/>)}
                </div>
            </div>
        </div>
    )
}