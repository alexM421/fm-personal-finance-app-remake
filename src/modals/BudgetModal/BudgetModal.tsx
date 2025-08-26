//CSS
import { useState } from "react"
import styles from "./BudgetModal.module.css"
import type { Budget } from "../../types/DataTypes"
import NumberInput from "../../shared/NumberInput/NumberInput"
import CategoriesSelect from "../../shared/CustomSelect/CategoriesSelect"
import ThemesSelect from "../../shared/CustomSelect/ThemesSelect"
import Button from "../../shared/Button/Button"

export default function BudgetModal () {


    const [formInputs, setFormInputs] = useState<Budget>({
        category: "Entertainment",
        maximum: 0,
        theme: "var(--green)"
    })

    const { category, maximum, theme } = formInputs

    const handleFormInputsUpdate = 
        (
            inputName: string,
            value: string | number,
        ) => {
            setFormInputs(prevInputs => ({...prevInputs, [inputName]: value}))
        }   

    return(
        <form className={styles["budget-modal"]}>
            <div className={styles["budget-modal-inputs"]}>
                <CategoriesSelect
                    selected={category}
                    setSelected={(e: string) => handleFormInputsUpdate("category",e)}
                    legend="Budget Category"
                />
                <NumberInput
                    legend="Budget maximum"
                    value={maximum}
                    setValue={(e: number) => handleFormInputsUpdate("maximum",e)}
                />
                <ThemesSelect
                    selected={theme}
                    setSelected={(e: string) => handleFormInputsUpdate("theme",e)}
                    legend="Budget Theme"
                />
            </div>
            <Button>Add Budget</Button>
        </form>
    )
}