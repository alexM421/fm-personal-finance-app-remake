//CSS
import { useState } from "react"
import EditBtn from "../../shared/EditBtn/EditBtn"
import styles from "./Budgets.module.css"
import ModalLayout from "../../modals/ModalLayout/ModalLayout"
import BudgetModal from "../../modals/BudgetModal/BudgetModal"
import DeleteModal from "../../modals/DeleteModal/DeleteModal"
import type { Budget } from "../../types/DataTypes"

type BudgetItemHeaderProps = {
    budget: Budget
}

export default function BudgetItemHeader ({ budget }: BudgetItemHeaderProps) {

    const [displayDelete, setDisplayDelete] = useState<boolean>(false)
    const [displayEdit, setDisplayEdit] = useState<boolean>(false)

    const { theme, category } = budget

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
                    budget={budget}
                />
            </ModalLayout>
            <ModalLayout
                modalTitle={`Delete '${budget.category}' ?`}
                modalDisplay={displayDelete}
                closeModalDisplay={() => setDisplayDelete(false)}
                modalDesc="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
            >
                <DeleteModal
                    closeModalDisplay={() => setDisplayDelete(false)}
                    itemToRemove={budget}
                />
            </ModalLayout>
        </>
    )
}