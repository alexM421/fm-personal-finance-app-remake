//CSS
import styles from "./BudgetModal.module.css"
//shared
import NumberInput from "../../shared/NumberInput/NumberInput"
import Button from "../../shared/Button/Button"
import CategoriesSelect from "../../shared/CustomSelect/CategoriesSelect"
import ThemesSelect from "../../shared/CustomSelect/ThemesSelect"
//budgets
import useBudgetModalForm from "./useBudgetModalForm"

type BudgetModalProps = {
    closeModalDisplay: () => void
}

export default function BudgetModal ({ closeModalDisplay }: BudgetModalProps) {

    const { formInputs, update, submit } = useBudgetModalForm(closeModalDisplay)

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
            <Button>Add Budget</Button>
        </form>
    )
}