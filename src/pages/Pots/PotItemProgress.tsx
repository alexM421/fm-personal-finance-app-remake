//CSS
import styles from "./Pots.module.css"
//contexts
import { useDataContext } from "../../contexts/DataContext"
//utils
import formatNumber from "../../utils/formatNumber"
import PotItemProgressBar from "./PotItemProgressBar"

type PotItemProgressProps = {
    theme: string,
    target: number,
    total: number,
    variant?: {
        isWithdraw: boolean,
        originalTotal: number,
    },
}

export default function PotItemProgress ({ theme, target, total, variant }: PotItemProgressProps) {

    const preferredCurrency = useDataContext().data.personnalSettings.preferredCurrency

    const ratio = total > target 
        ? 100
        : Math.round((total/target)*10000)/100


    return(
        <div className={styles["pot-item-progress"]}>
            <div className={styles["pot-item-total"]}>
                <p className="text-preset-4">{variant? "New Amount":"Total Saved"}</p>
                <h2 className="text-preset-1">{formatNumber(total, preferredCurrency, false)}</h2>
            </div>
            <PotItemProgressBar
                theme={theme}
                total={total}
                ratio={ratio}
                target={target}
                variant={variant}
            />
            <div className={styles["pot-item-target"]}>
                <p className="text-preset-5-bold">{ratio.toFixed(2)}%</p>
                <p className="text-preset-5">Target of {formatNumber(target, preferredCurrency, false)}</p>
            </div>
        </div>
    )
}