//CSS
import styles from "./NumberInput.module.css"

type NumberInputProps = {
    value: number,
    setValue: (e: number) => void 
}

export default function NumberInput ({ value, setValue }: NumberInputProps) {


    return(
        <div className={styles["number-input"]}>
            <p></p>
            <input 
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            />
        </div>
    )
}