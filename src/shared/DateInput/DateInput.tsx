//CSS
import styles from "./DateInput.module.css"

type DateInputProps = {
    controlledInput: string,
    setControlledInput: (string: string) => void
    name: string,
    legend: string,
    errorMessage: string
}

export default function DateInput ({ controlledInput, setControlledInput, name, legend, errorMessage}: DateInputProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setControlledInput(e.target.value)
    }

    return(
        <div className={`${styles["date-input"]} ${errorMessage? styles["error"]:""}`}>
            <div className={styles["input-header"]}>
                <p className="text-preset-5-bold">{legend}</p>
                <p className="text-preset-5-bold">{errorMessage}</p>
            </div>
            <input type="datetime-local" step={1}
                value={controlledInput}
                onChange={handleChange}
                name={name}
                id={name}
                required
            />
        </div>
    )
}