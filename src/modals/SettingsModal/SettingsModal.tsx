//CSS
import styles from "./SettingsModal.module.css"
//shared
import CustomSelectWrapper from "../../shared/CustomSelect/CustomSelectWrapper"
import NumberInput from "../../shared/NumberInput/NumberInput"
//settings
import useSettingsModalForm from "./useSettingsModalForm"
import Button from "../../shared/Button/Button"

type SettingsModalProps = {
    closeModalDisplay: () => void
}

export default function SettingsModal ({closeModalDisplay}: SettingsModalProps) {

    const { formInputs, update, monthDays, currenciesArr, submit } = useSettingsModalForm(closeModalDisplay)

    const { budgetCycleDay, preferredCurrency, originalBalance } = formInputs 

    return(
        <form className={styles["settings-modal"]} onSubmit={submit}>
            <div className={styles["settings-modal-numbers-input"]}>
                <CustomSelectWrapper
                    selected={String(budgetCycleDay)}
                    setSelected={(e) => update("budgetCycleDay",Number(e))}
                    options={monthDays}
                    legend="Set Budget Cycle Day"
                />
                <CustomSelectWrapper
                    selected={String(preferredCurrency)}
                    setSelected={(e) => update("preferredCurrency",e)}
                    options={currenciesArr}
                    legend="Set Preferred Currency"
                    hasSearch={true}
                />
            </div>
            <NumberInput
                value={originalBalance}
                setValue={(e) => update("originalBalance", e)}
                legend="Set Original Balance Amount"
                prefCurrency={preferredCurrency}
            />
            <Button>Edit Settings</Button>
        </form>
    )
}