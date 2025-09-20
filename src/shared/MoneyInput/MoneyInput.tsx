//CSS
import styles from "./MoneyInput.module.css"
//Shared
import CustomSelect from "../CustomSelect/CustomSelect"
//contexts
import { useCurrencyContext } from "../../contexts/CurrencyContext"

type MoneyInputProps = {
    amount: number,
    currency: string,
    setAmount: (e: number) => void,
    setCurrency: (e: string) => void,
    legend: string,
    max?: number,
    min?: number,
}

export default function MoneyInput ({amount, currency, setAmount, setCurrency, legend, max, min }: MoneyInputProps) {

    const  rates = useCurrencyContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = Number(e.target.value)
        if(max!==undefined && number>max){
            setAmount(max)
        }else if(min!==undefined && number<min){
            setAmount(min)
        }else{
            setAmount(number)
        }
    }

    const currenciesArr = rates 
        ?Object.keys(rates)
        :[] 

    return(
        <div className={styles["money-input"]}>
            <div className={styles["input-header"]}>
                <p className="text-preset-5-bold">{legend}</p>
            </div>
            <div className={styles["money-input-main"]}>
                <input
                    type="number"
                    value={amount}
                    onChange={handleChange}
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