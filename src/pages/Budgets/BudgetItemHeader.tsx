//CSS
import EditBtn from "../../shared/EditBtn/EditBtn"
import styles from "./Budgets.module.css"

type BudgetItemHeaderProps = {
    theme: string,
    category: string,
}

export default function BudgetItemHeader ({ theme, category}: BudgetItemHeaderProps) {

    return(
        <div className={styles["budget-item-header"]}>
            <div>
                <div 
                    className={styles["budget-item-color-pin"]}
                    style={{backgroundColor: theme}}    
                ></div>
                <h1 className="text-preset-2">{category}</h1>
            </div>
            <EditBtn/>
        </div>
    )
}