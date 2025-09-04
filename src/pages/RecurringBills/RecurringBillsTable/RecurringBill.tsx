//CSS
import styles from "../RecurringBills.module.css"
//shared
import Avatar from "../../../shared/Avatar/Avatar"
//types
import type { Bill } from "../../../types/DataTypes"

type RecurringBillProps = {
    bill: Bill
}

export default function RecurringBill ({ bill }: RecurringBillProps) {

    const { name, avatar, period } = bill
    const { theme, content, isContentImage } = avatar

    const paid = true

    return(
        <div className={styles["recurring-bill"]}>
            <div className={styles["recurring-bill-profile"]}>
                <Avatar
                    theme={theme}
                    content={content}
                    isContentImage={isContentImage}
                />
                <p className="text-preset-4-bold">{name}</p>
            </div>
            <div className={styles["recurring-bill-due"]}>
                <p className="text-preset-5">{period}</p>
                <img src={`/assets/images/icon-bill-${paid? "paid":"due"}.svg`}/>
            </div>
            <p className="text-preset-4-bold">$250.00</p>
        </div>
    )
}