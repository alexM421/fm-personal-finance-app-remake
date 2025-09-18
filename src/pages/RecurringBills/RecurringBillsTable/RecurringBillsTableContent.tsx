//CSS
import GapSeparation from "../../../shared/GapSeparation/GapSeparation"
import type { Bill } from "../../../types/DataTypes"
import styles from "../RecurringBills.module.css"
import RecurringBill from "./RecurringBill"

type RecurringBillsTableContentProps = {
    recurringBills: Bill[],
    recurringIncomes: Bill[],
    incomeToggle: boolean,
}

export default function RecurringBillsTableContent ({ recurringBills, recurringIncomes, incomeToggle }: RecurringBillsTableContentProps ) {

    const iteratingArr = incomeToggle? recurringIncomes:recurringBills

    return(
        <div className={styles["recurring-bills-table-content"]}>
            {iteratingArr.flatMap((bill,index) => {
                if (index===recurringBills.length-1) return (
                    <RecurringBill 
                        bill={bill} 
                        key={`bill-item-${bill.id}`}
                    />
                )
                
                return [
                    <RecurringBill bill={bill} key={`bill-item-${bill.id}`}/>,
                    <GapSeparation key={`bill-item-gap-${bill.id}`}/>
                ]  
            })}
        </div>
    )
}