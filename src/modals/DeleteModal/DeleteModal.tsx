//CSS
import styles from "./DeleteModal.module.css"
//shared
import Button from "../../shared/Button/Button"
//types
import type { Budget, Pot } from "../../types/DataTypes"
//utils
import syncUserData from "../../utils/syncUserData"
//contexts
import { useDataContext } from "../../contexts/DataContext"

type DeleteModalProps = {
    closeModalDisplay: () => void,
    itemToRemove: Pot | Budget
}

export default function DeleteModal ({ closeModalDisplay, itemToRemove }: DeleteModalProps) {

    const { data, setData} = useDataContext()

    const remove = () => {
        
        if("name" in itemToRemove){
            const potsArr = [...data.pots] 
            const potIndex = potsArr.findIndex(pot => pot.name === itemToRemove.name)
            potsArr.splice(potIndex,1)
            const updatedData = {...data, pots: potsArr}
            syncUserData(updatedData, setData)
        }else{
            const budgetsArr = [...data.budgets]
            const budgetIndex = budgetsArr.findIndex(budget => budget.category === itemToRemove.category)
            budgetsArr.splice(budgetIndex,1)
            const updatedData = {...data, budgets: budgetsArr}
            syncUserData(updatedData, setData)
        }
        closeModalDisplay()
    }

    return(
        <div className={styles["delete-modal"]}>
            <Button
                onClick={remove}
                variant="delete"
            >Yes, Confirm Deletion</Button>
            <button
                onClick={closeModalDisplay}
            >No, Go Back</button>
        </div>
    )
}