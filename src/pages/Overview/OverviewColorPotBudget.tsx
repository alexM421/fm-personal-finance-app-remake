//CSS
import styles from "./Overview.module.css"
//utils
import getSymbolFromCurrency from "currency-symbol-map"
//contexts
import { useDataContext } from "../../contexts/DataContext"


type OverviewPotProps = {
    colorCode: string,
    title: string,
    amount: number
}

export default function OverviewColorPotBudget ({ colorCode, title, amount }: OverviewPotProps) {

    const { data: { personnalSettings: { preferredCurrency }}} = useDataContext()

    return (
        <div className={styles["overview-color-pot-budget"]}>
            <div style={{backgroundColor: colorCode}}></div>
            <div>
                <p className="text-preset-5">{title}</p>
                <h3 className="text-preset-4-bold">{`${Math.round(amount)}${getSymbolFromCurrency(preferredCurrency)}`}</h3>
            </div>
        </div>
    )
}