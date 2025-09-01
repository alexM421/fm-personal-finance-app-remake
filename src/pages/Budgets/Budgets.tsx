//CSS
import styles from "./Budgets.module.css"
//react
import { useState } from "react"
//contexts
import { useComputedDataContext } from "../../contexts/ComputedDataContext"
//shared
import PageHeader from "../../components/PageHeader/PageHeader"
//Budgets
import BudgetsInfographic from "./BudgetsInfographic"
import BudgetItem from "./BudgetItem"
import ModalLayout from "../../modals/ModalLayout/ModalLayout"
import BudgetModal from "../../modals/BudgetModal/BudgetModal"

export default function Budgets () {

    const { computedData: { budgetsAmount } } = useComputedDataContext()

    const [showModal, setShowModal] = useState<boolean>(false)

    return(
        <>
            <div className={styles.budgets}>
                <PageHeader
                    pageTitle="Budgets"
                    btnTxt="+ Add New Budget"
                    toggleState={setShowModal}
                />
                <div className={styles["budgets-main"]}>
                    <BudgetsInfographic
                        budgets={budgetsAmount}
                    />
                    <div className={styles["budgets-container"]}>
                        {budgetsAmount.map(budget => <BudgetItem budgetAmount={budget} key={`budget-item-${budget.category}`}/>)}
                    </div>
                </div>
            </div>
            <ModalLayout
                modalTitle="Add new budget"
                modalDisplay={showModal}
                closeModalDisplay={() => setShowModal(false)}
                modalDesc="Add new budget"
            >
                <BudgetModal
                    closeModalDisplay={() => setShowModal(false)}
                />
            </ModalLayout>
        </>
    )
}