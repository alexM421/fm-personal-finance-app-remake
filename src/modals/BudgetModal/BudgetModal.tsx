//CSS
import styles from "./BudgetModal.module.css"
//shared
import NumberInput from "../../shared/NumberInput/NumberInput"
import Button from "../../shared/Button/Button"
import CategoriesSelect from "../../shared/CustomSelect/CategoriesSelect"
import ThemesSelect from "../../shared/CustomSelect/ThemesSelect"
//budgets
import useBudgetModalForm from "./useBudgetModalForm"
//types
import type { Budget } from "../../types/DataTypes"

type BudgetModalProps = {
    closeModalDisplay: () => void,
    budget?: Budget
}

export default function BudgetModal ({ closeModalDisplay, budget }: BudgetModalProps) {

    const { formInputs, update, submit } = useBudgetModalForm(closeModalDisplay, budget)

    const { category, maximum, theme } = formInputs
    
    return(
        <form className={styles["budget-modal"]} onSubmit={submit}>
            <div className={styles["budget-modal-inputs"]}>
                <CategoriesSelect
                    selected={category}
                    setSelected={(e: string) => update("category",e)}
                    legend="Budget Category"
                />
                <NumberInput
                    legend="Budget maximum"
                    value={maximum}
                    setValue={(e: number) => update("maximum",e)}
                />
                <ThemesSelect
                    selected={theme}
                    setSelected={(e: string) => update("theme",e)}
                    legend="Budget Theme"
                />
            </div>
            <Button>{`${budget? "Edit":"Add"} Budget`}</Button>
        </form>
    )
}