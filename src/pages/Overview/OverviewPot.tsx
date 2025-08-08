//CSS
import styles from "./Overview.module.css"

type OverviewPotProps = {
    colorCode: string,
    potTitle: string,
    amount: number
}

export default function OverviewPot ({ colorCode, potTitle, amount }: OverviewPotProps) {


    return (
        <div className={styles["overview-pot"]}>
            <div style={{backgroundColor: colorCode}}></div>
            <div>
                <p className="text-preset-5">{potTitle}</p>
                <h3 className="text-preset-4-bold">${amount}</h3>
            </div>
        </div>
    )
}