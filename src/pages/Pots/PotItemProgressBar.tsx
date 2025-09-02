//CSS
import roundNumber2Decimals from "../../utils/roundNumber2Decimals";
import styles from "./Pots.module.css"

type PotItemProgressBarProps = {
    ratio: number,
    total: number,
    theme: string,
    target: number,
    variant?: {
        isWithdraw: boolean,
        originalTotal: number,
    },
}

export default function PotItemProgressBar ({ratio, total, theme, variant, target }: PotItemProgressBarProps) {

    const style = { backgroundColor: theme, width: `${ratio.toFixed(2)}%`}

    if(variant){

        const { originalTotal, isWithdraw } = variant

        const changedAmountRatio = roundNumber2Decimals(Math.abs(total - originalTotal) / (isWithdraw? originalTotal:total)*100) 
        const originalRatio = roundNumber2Decimals(originalTotal/target)*100

        const originalColorStop = isWithdraw
            ? Math.max(100-changedAmountRatio,0)
            : Math.max(100-changedAmountRatio,0)
    
        const variantStyle = { width: `${isWithdraw? originalRatio.toFixed(2):ratio.toFixed(2)}%` , backgroundColor: "var'(--grey-100)" }
    
        return(
            <div className={styles["pot-item-progress-bar-ext"]}>
                <div 
                    className={`${styles["pot-item-progress-bar-int"]}`}
                    style={variantStyle}
                >
                    <div 
                        className={styles["pot-item-progress-bar-variant-int-element"]}
                        style={{width: `${originalColorStop.toFixed(2)}%`}}
                    ></div>
                    <div 
                        className={styles["pot-item-progress-bar-variant-int-element"]}
                        style={{
                            backgroundColor: isWithdraw? "var(--red)":"var(--green)", 
                            borderTopLeftRadius: originalColorStop===0 && isWithdraw? "8px":"0px",
                            borderBottomLeftRadius: originalColorStop===0 && isWithdraw? "8px":"0px"
                        }}    
                    ></div>
                </div>
            </div>
        )
    }




    return(
        <div className={styles["pot-item-progress-bar-ext"]}>
            <div 
                className={styles["pot-item-progress-bar-int"]}
                style={style}
            ></div>
        </div>
    )
}