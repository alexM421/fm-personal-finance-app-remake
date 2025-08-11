//CSS
import styles from "./Overview.module.css"
//overview
import OverviewHeader from "./OverviewHeader"
//shared
import Infographic from "../../shared/Infographic/Infographic"
//contexts
import OverviewColorPotBudget from "./OverviewColorPotBudget"
import { useComputedDataContext } from "../../contexts/ComputedDataContext"


export default function OverviewBudgets () {

    const { budgetsAmount } = useComputedDataContext().computedData

    return(
        <div className={styles["overview-budgets"]}>
            <OverviewHeader
                title="Budgets"
                link="/budgets"
                btnDesc="See Details"
            />
            <div className={styles["overview-budgets-main"]}>
                <Infographic/>
                <div className={styles["overview-budgets-desc"]}>
                    {budgetsAmount.map(budget => 
                        <OverviewColorPotBudget
                            colorCode={budget.theme}
                            title={budget.category}
                            amount={Math.floor(Math.abs(budget.amount))}
                            key={`overview-budget-item-${budget.category}`}
                        />    
                    )}
                </div>
            </div>
        </div>
    )
}