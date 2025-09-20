//CSS
import styles from "./Transactions.module.css"
//react
import { useState } from "react"
//shared
import Avatar from "../../shared/Avatar/Avatar"
//modals
import ModalLayout from "../../modals/ModalLayout/ModalLayout"
import TransactionModal from "../../modals/TransactionModal/TransactionModal"
//utils
import formatNumber from "../../utils/formatNumber"
//types
import type { Transaction } from "../../types/DataTypes"

type TransactionitemProps = {
    transaction: Transaction,
    isMobile: boolean,
}

export default function TransactionItem ({ transaction, isMobile }: TransactionitemProps) {

    const [displayTransactionModal, toggleDisplayTransactionModal] = useState(false)

    const { amount, avatar, category, date, name, currency } = transaction
    const { theme, content, isContentImage } = avatar

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
                {!isMobile 
                    ?<>
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
                        >{formatNumber(amount, currency, true)}</h2>
                    </>
                    :<>
                        <div className={styles["transaction-item-profile"]}>
                            <Avatar
                                theme={theme}
                                content={content}
                                isContentImage={isContentImage}
                            />
                            <div>
                                <h2 className="text-preset-4-bold">{name}</h2>
                                <p className="text-preset-5">{category}</p>
                            </div>
                        </div>
                        <div>
                            <h2
                                className="text-preset-4-bold" 
                                style={{color: amount<0
                                    ?"var(--grey-900)"
                                    :"var(--green)"
                                }}
                            >{formatNumber(amount, currency, true)}</h2>
                            <p className="text-preset-5">{stringDate}</p>
                        </div>
                    </>
                }
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