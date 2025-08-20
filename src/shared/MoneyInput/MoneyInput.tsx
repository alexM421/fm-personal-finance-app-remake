//CSS
import styles from "./MoneyInput.module.css"
//Shared
import CustomSelect from "../CustomSelect/CustomSelect"

export default function MoneyInput ({ legend,  }) {


    return(
        <div className={styles["money-input"]}>
            <p>{legend}</p>
            <label>
                <CustomSelect
                    selected={selected}
                />
            </label>
        </div>
    )
}