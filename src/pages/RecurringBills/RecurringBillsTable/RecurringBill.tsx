//CSS
import styles from "../RecurringBills.module.css"
//shared
import Avatar from "../../../shared/Avatar/Avatar"
//types
import type { Bill } from "../../../types/DataTypes"
import ModalLayout from "../../../modals/ModalLayout/ModalLayout"
import BillModal from "../../../modals/BillModal/BillModal"
import { useState } from "react"
import formatNumber from "../../../utils/formatNumber"
import getDueDateDisplay from "./getDueDateDisplay"
import { useDateContext } from "../../../contexts/DateContext"
import getBillPaidStatus from "./getBillPaidStatus"

type RecurringBillProps = {
    bill: Bill
}

export default function RecurringBill ({ bill }: RecurringBillProps) {

    const { date } = useDateContext()

    const possibleDate = date?.datetime || new Date().toISOString()

    const [modalDisplay, setModalDisplay] = useState<boolean>(false)
    
    const { name, avatar, period, amount, currency, dueDate } = bill
    const { theme, content, isContentImage } = avatar
    const dueDateObj = new Date(dueDate)
    const dueDateDisplay = getDueDateDisplay(dueDateObj, period)
    const { isPaid, isNeutral, isDueSoon } = getBillPaidStatus(possibleDate, dueDate, period)

    return(
        <>
            <button className={styles["recurring-bill"]} onClick={() => setModalDisplay(true)}>
                <div className={styles["recurring-bill-profile"]}>
                    <Avatar
                        theme={theme}
                        content={content}
                        isContentImage={isContentImage}
                    />
                    <p className="text-preset-4-bold">{name}</p>
                </div>
                <div className={styles["recurring-bill-due"]}>
                    <p 
                        className="text-preset-5"
                        style={{color: isPaid? "var(--green)":"var(--grey-500)"}}
                    >{dueDateDisplay}</p>
                    {!isNeutral 
                    && <img src={`/assets/images/icon-bill-${isPaid? "paid":"due"}.svg`}/>}
                </div>
                <p 
                    className="text-preset-4-bold"
                    style={{color: amount>=0? "var(--grey-900)":"var(--red)"}}
                >{formatNumber(amount, currency, false)}</p>
            </button>
            <ModalLayout
                modalTitle="Edit bill"
                modalDesc="Edit a bill"
                modalDisplay={modalDisplay}
                closeModalDisplay={() => setModalDisplay(false)}
            >
                <BillModal
                    closeModalDisplay={() => setModalDisplay(false)}
                    billData={bill}
                />
            </ModalLayout>
        </>
    )
}