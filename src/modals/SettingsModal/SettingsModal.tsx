//CSS
import styles from "./SettingsModal.module.css"
//shared
import CustomSelectWrapper from "../../shared/CustomSelect/CustomSelectWrapper"
import NumberInput from "../../shared/NumberInput/NumberInput"
//settings
import useSettingsModalForm from "./useSettingsModalForm"

export default function SettingsModal () {

    const { formInputs, update, monthDays, currenciesArr } = useSettingsModalForm()

    const { budgetCycleDay, preferredCurrency, originalBalance } = formInputs 

    return(
        <form className={styles["settings-modal"]}>
            <div className={styles["settings-modal-numbers-input"]}>
                <CustomSelectWrapper
                    selected={String(budgetCycleDay)}
                    setSelected={(e) => update("budgetCycleDay",e)}
                    options={monthDays}
                    legend="Set Budget Cycle Day"
                />
                <CustomSelectWrapper
                    selected={String(preferredCurrency)}
                    setSelected={(e) => update("preferredCurrency",e)}
                    options={currenciesArr}
                    legend="Set Preferred Currency"
                />
            </div>
            <NumberInput
                value={originalBalance}
                setValue={(e) => update("originalBalance", e)}
                legend="Set Original Balance Amount"
            />
        </form>
    )
}