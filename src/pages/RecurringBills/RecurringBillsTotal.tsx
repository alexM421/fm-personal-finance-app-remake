//CSS
import styles from "./RecurringBills.module.css"
//utils
import formatNumber from "../../utils/formatNumber"
//contexts
import { useDataContext } from "../../contexts/DataContext"
import { useCurrencyContext } from "../../contexts/CurrencyContext"
import getBillsAmount from "../../utils/getBillsAmount"

export default function RecurringBillsTotal () {

    const { data: { bills }, data: { personnalSettings: { preferredCurrency}}} = useDataContext()
    const rates = useCurrencyContext()
    
    const totalBillsAmount = getBillsAmount(bills, rates)

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