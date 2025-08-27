//CSS
import styles from "./Budgets.module.css"
//shared
import Infographic from "../../shared/Infographic/Infographic"
//types
import type { BudgetAmount } from "../../contexts/ComputedDataContext"
import BudgetSpending from "./BudgetSpending"
import GapSeparation from "../../shared/GapSeparation/GapSeparation"

type BudgetsInfographicProps = {
    budgets: BudgetAmount[]
}

export default function BudgetsInfographic ({ budgets }: BudgetsInfographicProps) {


    return(
        <div className={styles["budgets-infographic"]}>
            <Infographic/>
            <div className={styles["budgets-spending"]}>
                <h1 className="text-preset-2">Spending Summary</h1>
                <div className={styles["budgets-spending-main"]}>
                    {budgets.flatMap((budget, index) => 
                        index===budgets.length-1
                        ?<BudgetSpending
                            budget={budget}
                            key={`budget-${budget.category}`}
                        />
                        :[<BudgetSpending
                            budget={budget}
                            key={`budget-${budget.category}`}
                        />,
                            <GapSeparation
                            key={`budget-${budget.category}-gap-separation`}
                            />
                        ]
                    )}
                </div>
            </div>
        </div>
    )
}