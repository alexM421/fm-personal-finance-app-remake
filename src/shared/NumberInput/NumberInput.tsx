//CSS
import { useDataContext } from "../../contexts/DataContext"
import styles from "./NumberInput.module.css"
//others
import getSymbolFromCurrency from "currency-symbol-map"

type NumberInputProps = {
    value: number,
    setValue: (e: number) => void 
    legend: string,
    min?: number,
    max?: number
}   

export default function NumberInput ({ value, setValue, legend, min, max }: NumberInputProps) {

    const { data: { personnalSettings: { preferredCurrency }}} = useDataContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = Number(e.target.value)
        if(max!==undefined && number>max){
            setValue(max)
        }else if(min!==undefined && number<min){
            setValue(min)
        }else{
            setValue(number)
        }
    }

    return(
        <div className={styles["number-input"]}>
             <div className={styles["input-header"]}>
                <p className="text-preset-5-bold">{legend}</p>
            </div>
            <label>
                <p className="text-preset-4">{getSymbolFromCurrency(preferredCurrency) || preferredCurrency}</p>
                <input 
                    type="number"
                    value={value}
                    onChange={handleChange}
                    className="text-preset-4"
                />
            </label>
        </div>
    )
}