//CSS
import styles from "./MoneyInput.module.css"
//Shared
import CustomSelect from "../CustomSelect/CustomSelect"
//contexts
import { useCurrencyContext } from "../../contexts/CurrencyContext"
import { useState } from "react"

export default function MoneyInput ({}) {

    const  rates = useCurrencyContext()?.rates

    const currenciesArr = rates 
        ?Object.keys(rates)
        :[] 

    
    const [amount, setAmount] = useState<number>(0)
    const [currency, setCurrency] = useState<string>("USD")

    return(
        <div className={styles["money-input"]}>
            <div className={styles["input-header"]}>
                <p className="text-preset-5-bold">Legend</p>
                <p className="text-preset-5-bold"></p>
            </div>
            <div className={styles["money-input-main"]}>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <CustomSelect
                    selected={currency}
                    setSelected={setCurrency}
                    hasSearch={true}
                    options={currenciesArr}
                />
            </div>
            
            
        </div>
    )
}