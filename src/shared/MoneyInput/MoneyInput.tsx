//CSS
import styles from "./MoneyInput.module.css"
//Shared
import CustomSelect from "../CustomSelect/CustomSelect"
//contexts
import { useCurrencyContext } from "../../contexts/CurrencyContext"
import { useState } from "react"

type MoneyInputProps = {
    amount: number,
    currency: string,
    setAmount: (e: number) => void,
    setCurrency: (e: string) => void,
}

export default function MoneyInput ({amount, currency, setAmount, setCurrency}: MoneyInputProps) {

    const  rates = useCurrencyContext()

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setAmount(Number(value))
    }

    const currenciesArr = rates 
        ?Object.keys(rates)
        :[] 

    return(
        <div className={styles["money-input"]}>
            <div className={styles["input-header"]}>
                <p className="text-preset-5-bold">Transaction Amount</p>
            </div>
            <div className={styles["money-input-main"]}>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
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