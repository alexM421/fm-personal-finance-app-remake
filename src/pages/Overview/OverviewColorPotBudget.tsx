//CSS
import styles from "./Overview.module.css"

type OverviewPotProps = {
    colorCode: string,
    title: string,
    amount: number
}

export default function OverviewColorPotBudget ({ colorCode, title, amount }: OverviewPotProps) {


    return (
        <div className={styles["overview-color-pot-budget"]}>
            <div style={{backgroundColor: colorCode}}></div>
            <div>
                <p className="text-preset-5">{title}</p>
                <h3 className="text-preset-4-bold">${amount}</h3>
            </div>
        </div>
    )
}