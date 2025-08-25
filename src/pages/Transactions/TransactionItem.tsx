//CSS
import styles from "./Transactions.module.css"
//types
import type { Transaction } from "../../types/DataTypes"
import Avatar from "../../shared/Avatar/Avatar"
import { useState } from "react"
import ModalLayout from "../../modals/ModalLayout/ModalLayout"
import TransactionModal from "../../modals/TransactionModal/TransactionModal"

type TransactionitemProps = {
    transaction: Transaction
}



export default function TransactionItem ({ transaction }: TransactionitemProps) {

    const [displayTransactionModal, toggleDisplayTransactionModal] = useState(false)

    const { amount, avatar, category, date, name, } = transaction
    const { theme, content, isContentImage } = avatar

    const sign = amount<0? "-":"+"
    const transactionDate = new Date(date)

    const stringDate = transactionDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })

    return(
        <>
            <button 
                className={styles["transaction-item"]} 
                onClick={() => toggleDisplayTransactionModal(true)}
            >
                <div className={styles["transaction-item-profile"]}>
                    <Avatar
                        theme={theme}
                        content={content}
                        isContentImage={isContentImage}
                    />
                    <h2 className="text-preset-4-bold">{name}</h2>
                </div>
                <p className="text-preset-5">{category}</p>
                <p className="text-preset-5">{stringDate}</p>
                <h2
                    className="text-preset-4-bold" 
                    style={{color: amount<0
                        ?"var(--grey-900)"
                        :"var(--green)"
                    }}
                >{`${sign}$${Math.abs(amount).toFixed(2)}`}</h2>
            </button>
            <ModalLayout
                modalTitle={`Edit Transaction`}
                modalDesc="Edit and modify this transaction."
                modalDisplay={displayTransactionModal}
                closeModalDisplay={() => toggleDisplayTransactionModal(false)}
            >
                <TransactionModal
                    closeModalDisplay={() => toggleDisplayTransactionModal(false)}
                    transactionData={transaction}
                />
            </ModalLayout>
        </>
    )
}