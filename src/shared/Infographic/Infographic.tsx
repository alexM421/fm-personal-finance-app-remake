//CSS
import styles from "./Infographic.module.css"
//contexts
import { useComputedDataContext } from "../../contexts/ComputedDataContext"
import { useDataContext } from "../../contexts/DataContext"
//infographic
import getInfographicColors from "./getInfographicColors"
//others
import getSymbolFromCurrency from "currency-symbol-map"


export default function Infographic () {

    
    const { budgetsAmount } = useComputedDataContext().computedData
    const { data: { personnalSettings: { preferredCurrency }}} = useDataContext()

    const budgetLimit = budgetsAmount.reduce((acc, currentBudget) => acc + currentBudget.maximum, 0)
    const budgetCurrentSpending = Math.round(Math.abs(budgetsAmount.reduce((acc, budgetAmount) => acc + budgetAmount.amount, 0)))
    const formattedSpending = Intl.NumberFormat("en-US").format(budgetCurrentSpending)
    const symbol = getSymbolFromCurrency(preferredCurrency)
    const backgroundStyle = getInfographicColors(budgetCurrentSpending, budgetsAmount)

    return(
        <div className={styles.infographic} style={{backgroundImage: backgroundStyle}}>
            <div className={styles["infographic-second-layer"]}></div>
            <div className={styles["infographic-content"]}>
                <h1 className="text-preset-1">{`${formattedSpending}${symbol}`}</h1>
                <p className="text-preset-5">of {`${budgetLimit}${symbol}`} limit</p>
            </div>
        </div>
    )
}