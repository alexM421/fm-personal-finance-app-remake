//CSS
import styles from "./Pots.module.css"
//contexts
import { useDataContext } from "../../contexts/DataContext"
//utils
import formatNumber from "../../utils/formatNumber"

type PotItemProgressProps = {
    theme: string,
    target: number,
    total: number
}

export default function PotItemProgress ({ theme, target, total }: PotItemProgressProps) {

    const preferredCurrency = useDataContext().data.personnalSettings.preferredCurrency

    const ratio = total > target 
        ? "100.00%"
        : `${((total/target)*100).toFixed(2)}%`

    return(
        <div className={styles["pot-item-progress"]}>
            <div className={styles["pot-item-total"]}>
                <p className="text-preset-4">Total Saved</p>
                <h2 className="text-preset-1">{formatNumber(total, preferredCurrency, false)}</h2>
            </div>
            
            <div className={styles["pot-item-progress-bar-ext"]}>
                <div 
                    className={styles["pot-item-progress-bar-int"]}
                    style={{
                        backgroundColor: theme,
                        width: ratio
                    }}
                ></div>
            </div>
            
            <div className={styles["pot-item-target"]}>
                <p className="text-preset-5-bold">{ratio}</p>
                <p className="text-preset-5">Target of {formatNumber(target, preferredCurrency, false)}</p>
            </div>
        </div>
    )
}