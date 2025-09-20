//CSS
import type { Dispatch, SetStateAction } from "react"
import styles from "./ToggleBtn.module.css"

type ToggleBtnProps = {
    setState: Dispatch<SetStateAction<boolean>>,
    state: boolean,
    id: string,
}

export default function ToggleBtn ({ setState, state, id }: ToggleBtnProps) {

    return(

        <label 
            className={`${styles["toggle-btn"]} ${state && styles.toggled}`}
            htmlFor={id}
        >
            <div className={styles["toggle-btn-marker"]}></div>
            <input 
                id={id}
                type="checkbox"
                onChange={() => setState(prevState => !prevState)}
                checked={state}
            />
        </label>

    )
}