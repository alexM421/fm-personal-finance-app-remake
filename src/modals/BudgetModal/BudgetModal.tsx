//CSS
import { useState } from "react"
import styles from "./BudgetModal.module.css"
import type { Budget } from "../../types/DataTypes"
import NumberInput from "../../shared/NumberInput/NumberInput"
import CategoriesSelect from "../../shared/CustomSelect/CategoriesSelect"
import ThemesSelect from "../../shared/CustomSelect/ThemesSelect"

export default function BudgetModal () {


    const [formInputs, setFormInputs] = useState<Budget>({
        category: "",
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
            <CategoriesSelect
                selected={category}
                setSelected={(e: string) => handleFormInputsUpdate("category",e)}
                legend="Budget Category"
            />
            <NumberInput
                value={maximum}
                setValue={(e: number) => handleFormInputsUpdate("maximum",e)}
            />
            <ThemesSelect
                selected={theme}
                setSelected={(e: string) => handleFormInputsUpdate("theme",e)}
                legend="Budget Theme"
            />
        </form>
    )
}