//CSS
import styles from "./RecurringBills.module.css"
//utils
import formatNumber from "../../utils/formatNumber"
//contexts
import { useDataContext } from "../../contexts/DataContext"
import { useCurrencyContext, type Currency } from "../../contexts/CurrencyContext"

export default function RecurringBillsTotal () {

    const { data: { bills }, data: { personnalSettings: { preferredCurrency}}} = useDataContext()
    const rates = useCurrencyContext()
    
    const totalBillsAmount = bills.reduce((acc, bill) => {
        if(rates){
            return bill.amount*rates[bill.currency as Currency] + acc
        }else{
            return bill.amount + acc
        }
    }, 0)

    return(
        <div className={styles["recurring-bills-total"]}>
            <img src="/assets/images/icon-recurring-bills.svg"/>
            <div>
                <p className="text-preset-4">Total Bills</p>
                <h2 className="text-preset-1">{formatNumber(totalBillsAmount, preferredCurrency, false)}</h2>
            </div>
        </div>
    )
}