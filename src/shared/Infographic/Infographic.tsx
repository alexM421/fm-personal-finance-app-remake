//CSS
import styles from "./Infographic.module.css"
//contexts
import { useComputedDataContext } from "../../contexts/ComputedDataContext"
import getInfographicColors from "./getInfographicColors"


export default function Infographic () {

    
    const { budgetedTransactions, budgetsAmount } = useComputedDataContext().computedData

    const budgetLimit = budgetsAmount.reduce((acc, currentBudget) => acc + currentBudget.maximum, 0)
    const budgetCurrentSpending = Math.round(Math.abs(budgetedTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)))
    const backgroundStyle = getInfographicColors(budgetCurrentSpending, budgetsAmount)

    return(
        <div className={styles.infographic} style={{backgroundImage: backgroundStyle}}>
            <div className={styles["infographic-second-layer"]}></div>
            <div className={styles["infographic-content"]}>
                <h1 className="text-preset-1">${budgetCurrentSpending}</h1>
                <p className="text-preset-5">of ${budgetLimit} limit</p>
            </div>
        </div>
    )
}