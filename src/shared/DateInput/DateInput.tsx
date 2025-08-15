//CSS
import styles from "./DateInput.module.css"

type DateInputProps = {
    controlledInput: string,
    setControlledInput: (string: string) => void
    name: string,
    legend: string,
}

export default function DateInput ({ controlledInput, setControlledInput, name, legend}: DateInputProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setControlledInput(e.target.value)
    }

    return(
        <div className={styles["date-input"]}>
            <p className="text-preset-5-bold">{legend}</p>
            <input type="datetime-local" step={1}
                value={controlledInput}
                onChange={handleChange}
                name={name}
                id={name}
            />
        </div>
    )
}