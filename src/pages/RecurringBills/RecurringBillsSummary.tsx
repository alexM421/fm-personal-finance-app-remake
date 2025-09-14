//CSS
import styles from "./RecurringBills.module.css"
//contexts
import { useDataContext } from "../../contexts/DataContext"
import { useDateContext } from "../../contexts/DateContext"
//shared
import GapSeparation from "../../shared/GapSeparation/GapSeparation"
//utils
import getBillPaidStatus from "./RecurringBillsTable/getBillPaidStatus"
import getBillsAmount from "../../utils/getBillsAmount"
import { useCurrencyContext } from "../../contexts/CurrencyContext"
import formatNumber from "../../utils/formatNumber"

export default function RecurringBillsSummary () {

    const { data: { bills }, data: { personnalSettings: { preferredCurrency}}} = useDataContext()
    const { date } = useDateContext()
    const rates = useCurrencyContext()
    const datetime = date?.datetime || new Date().toISOString().slice(0,16)

    const paidBills = bills.filter(bill => {
        const { isPaid } = getBillPaidStatus(datetime, bill.dueDate, bill.period)
        return isPaid
    })

    const upcomingBills =  bills.filter(bill => {
        const { isPaid } = getBillPaidStatus(datetime, bill.dueDate, bill.period)
        return !isPaid
    })

    const dueSoonBills = bills.filter(bill => {
        const { isDueSoon } = getBillPaidStatus(datetime, bill.dueDate, bill.period)
        return isDueSoon
    })

    const paidBillsAmount =  getBillsAmount(paidBills, rates)
    const upcomingBillsAmount = getBillsAmount(upcomingBills, rates)
    const dueSoonBillsAmount = getBillsAmount(dueSoonBills, rates)

    return(
        <div className={styles["recurring-bills-summary"]}>
            <h2 className="text-preset-3">Summary</h2>
            <div className={styles["recurring-bills-summmary-details"]}>
                <div className={styles["recurring-bills-summary-detail"]}>
                    <p className="text-preset-5">Paid Bills</p>
                    <h3 className="text-preset-5-bold">{`${paidBills.length} (${formatNumber(paidBillsAmount, preferredCurrency, false)})`}</h3>
                </div>
                <GapSeparation/>
                <div className={styles["recurring-bills-summary-detail"]}>
                    <p className="text-preset-5">Total Upcoming</p>
                    <h3 className="text-preset-5-bold">{`${upcomingBills.length} (${formatNumber(upcomingBillsAmount, preferredCurrency, false)})`}</h3>
                </div>
                <GapSeparation/>
                <div className={styles["recurring-bills-summary-detail"]}>
                    <p className="text-preset-5">Due Soon</p>
                    <h3 className="text-preset-5-bold">{`${dueSoonBills.length} (${formatNumber(dueSoonBillsAmount, preferredCurrency, false)})`}</h3>
                </div>
            </div>  
        </div>
    )
}