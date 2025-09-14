//CSS
import styles from "./TransactionModal.module.css"
//React
import { useState } from "react"
//shared
import Button from "../../shared/Button/Button"
import TextInput from "../../shared/TextInput/TextInput"
import DateInput from "../../shared/DateInput/DateInput"
import MoneyInput from "../../shared/MoneyInput/MoneyInput"
import Avatar from "../../shared/Avatar/Avatar"
import CategoriesSelect from "../../shared/CustomSelect/CategoriesSelect"
//Transactions
import AddTransactionmodalPicturePopUp from "./TransactionModalPicturePopUp"
import useTransactionModalForm from "./useTransactionModalForm"
//types
import type { Transaction } from "../../types/DataTypes"


type AddTransactionModalProps = {
    closeModalDisplay: () => void,
    transactionData?: Transaction,
}

export default function TransactionModal ({ closeModalDisplay, transactionData }: AddTransactionModalProps) {

    const [displayChoosePicture, setDisplayChoosePicture] = useState<boolean>(false)

    const { formInputs, update, remove, submit } = useTransactionModalForm(transactionData, closeModalDisplay)

    return(
        <form 
            className={styles["add-transaction-modal"]}
            onSubmit={submit}
        >
            <div className={styles["add-transaction-inputs"]}>
                <div className={styles["add-transaction-profile"]}>
                    <div className={styles["add-transaction-choose-picture"]}
                    >
                        <button onClick={() => setDisplayChoosePicture(true)} type="button">
                            <Avatar
                                theme={formInputs.avatar.theme}
                                content={formInputs.avatar.content}
                                isContentImage={formInputs.avatar.isContentImage}
                            />
                        </button>
                        <AddTransactionmodalPicturePopUp
                            display={displayChoosePicture}
                            toggleDisplay={setDisplayChoosePicture}
                            avatar={formInputs.avatar}
                            setAvatar={(e) => update("avatar", e)}
                            name={formInputs.name}
                        />
                    </div>
                    <div className={styles["add-transaction-profile-desc"]}>
                        <TextInput
                            inputDetails={{
                                name: "name",
                                legend: "Transaction name",
                                autoComplete: "none",
                                type: "text",
                                controlledInput: formInputs.name,
                                placeholder: "E.g. Groceries",
                                setControlledInput: (e) => update("name", e.target.value)
                            }}
                            isPassword={false}
                            errorMessage={formInputs.name? "":"Please enter a transaction name"}
                        />
                        <DateInput
                            controlledInput={formInputs.date}
                            setControlledInput={(date) => update("date", date)}
                            legend="Transaction Date"
                            name="date"
                            errorMessage={formInputs.date? "":"Please enter a transaction date"}
                        />
                    </div>
                </div>
                <CategoriesSelect
                    selected={formInputs.category}
                    setSelected={(e: string) => update("category", e)}
                    legend="Transaction Category"
                />
                <MoneyInput
                    amount={formInputs.amount}
                    currency={formInputs.currency}
                    setAmount={(e) => update("amount", e)}
                    setCurrency={(e) => update("currency", e)}
                    legend="Transaction Amount"
                />
            </div>
            {
                transactionData
                    ?<div className={styles["transaction-modal-btns"]}>
                        <Button 
                            variant="delete"
                            onClick={remove}
                        >Delete Transaction</Button>
                        <Button>Edit Transaction</Button>
                    </div>
                    :<Button>Add Transaction</Button>
            }
        </form>
    )
}