//CSS
import styles from "./NumberInput.module.css"

type NumberInputProps = {
    value: number,
    setValue: (e: number) => void 
    legend: string,
}

export default function NumberInput ({ value, setValue, legend }: NumberInputProps) {


    return(
        <div className={styles["number-input"]}>
             <div className={styles["input-header"]}>
                <p className="text-preset-5-bold">{legend}</p>
            </div>
            <input 
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                min={0}
            />
        </div>
    )
}