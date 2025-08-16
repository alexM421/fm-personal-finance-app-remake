//CSS
import CustomSelect from "../CustomSelect/CustomSelect"
import styles from "./MoneyInput.module.css"

export default function MoneyInput ({ legend }) {


    return(
        <div className={styles["money-input"]}>
            <p>{legend}</p>
            <label>
                {/* <CustomSelect/>
                <input 
                    type="number"
                    
                /> */}
            </label>
        </div>
    )
}