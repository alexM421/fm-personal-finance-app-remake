//CSS
import type { Dispatch, SetStateAction } from "react"
import styles from "./ToggleBtn.module.css"

type ToggleBtnProps = {
    setState: Dispatch<SetStateAction<boolean>>,
    state: boolean
}

export default function ToggleBtn ({ setState, state }: ToggleBtnProps) {


    

    return(

        <label 
            className={`${styles["toggle-btn"]} ${state && styles.toggled}`}
            htmlFor="test"
        >
            <div className={styles["toggle-btn-marker"]}></div>
            <input 
                id="test"
                type="checkbox"
                onChange={() => setState(prevState => !prevState)}
            />
        </label>

    )
}