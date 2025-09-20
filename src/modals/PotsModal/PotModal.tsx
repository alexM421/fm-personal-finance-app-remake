//CSS
import styles from "./PotModal.module.css"
//shared
import NumberInput from "../../shared/NumberInput/NumberInput"
import Button from "../../shared/Button/Button"
import ThemesSelect from "../../shared/CustomSelect/ThemesSelect"
import TextInput from "../../shared/TextInput/TextInput"
//pots
import usePotModalForm from "./usePotModalForm"
//types
import type { Pot } from "../../types/DataTypes"

type PotModalProps = {
    closeModalDisplay: () => void,
    pot?: Pot
}

export default function PotModal ({ closeModalDisplay, pot }: PotModalProps) {

    const { formInputs, update, submit, error } = usePotModalForm(closeModalDisplay, pot)

    const { name, target, theme } = formInputs


    return(
        <form className={styles["pot-modal"]} onSubmit={submit}>
            <div className={styles["pot-modal-inputs"]}>
                <TextInput
                    inputDetails={{
                        name: "name",
                        legend: "Pot Name",
                        type: "text",
                        autoComplete: "",
                        controlledInput: name,
                        setControlledInput: (e) => update("name",e.target.value),
                        placeholder: "e.g. Rainy Days"
                    }}
                    isPassword={false}
                    errorMessage={error? "Please enter the pot name.":""}
                    helperText=""
                />
                <NumberInput
                    legend="Pot target"
                    value={target}
                    setValue={(e: number) => update("target",e)}
                />
                <ThemesSelect
                    selected={theme}
                    setSelected={(e: string) => update("theme",e)}
                    legend="Pot Theme"
                />
            </div>
            <Button>{`${pot? "Edit":"Add"} Pot`}</Button>
        </form>
    )
}