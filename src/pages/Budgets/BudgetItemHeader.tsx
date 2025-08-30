//CSS
import { useState } from "react"
import EditBtn from "../../shared/EditBtn/EditBtn"
import styles from "./Budgets.module.css"
import ModalLayout from "../../modals/ModalLayout/ModalLayout"
import BudgetModal from "../../modals/BudgetModal/BudgetModal"
import type { BudgetAmount } from "../../contexts/ComputedDataContext"

type BudgetItemHeaderProps = {
    budget: BudgetAmount
}

export default function BudgetItemHeader ({ budget }: BudgetItemHeaderProps) {

    const [displayDelete, setDisplayDelete] = useState<boolean>(false)
    const [displayEdit, setDisplayEdit] = useState<boolean>(false)

    const { theme, category, maximum } = budget
    const budgetWithoutAmount = {
        theme: theme,
        category: category,
        maximum: maximum
    }

    return(
        <>
            <div className={styles["budget-item-header"]}>
                <div>
                    <div 
                        className={styles["budget-item-color-pin"]}
                        style={{backgroundColor: theme}}    
                    ></div>
                    <h1 className="text-preset-2">{category}</h1>
                </div>
                <EditBtn
                    displayDelete={() => setDisplayDelete(true)}
                    displayEdit={() => setDisplayEdit(true)}
                />
            </div>
            <ModalLayout
                modalTitle="Edit budget"
                modalDisplay={displayEdit}
                closeModalDisplay={() => setDisplayEdit(false)}
                modalDesc="Edit new budget"
            >
                <BudgetModal
                    closeModalDisplay={() => setDisplayEdit(false)}
                    budget={budgetWithoutAmount}
                />
            </ModalLayout>
        </>
    )
}