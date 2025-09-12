//CSS
import styles from "./BillModal.module.css"
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
import AddTransactionmodalPicturePopUp from "../TransactionModal/TransactionModalPicturePopUp"
//Bills
import PeriodSelectBillModal from "./PeriodSelectBillModal"
import useBillModalForm from "./useBillModalForm"
//types
import type { Bill } from "../../types/DataTypes"


type BillModalProps = {
    closeModalDisplay: () => void,
    billData?: Bill,
}

export default function BillModal ({ closeModalDisplay, billData }: BillModalProps) {

    const [displayChoosePicture, setDisplayChoosePicture] = useState<boolean>(false)

    const { formInputs, update, remove, submit, suspend, cancel } = useBillModalForm(billData, closeModalDisplay)

    const { period } = formInputs

    return(
        <form 
            className={styles["add-bill-modal"]}
            onSubmit={submit}
        >
            <div className={styles["add-bill-inputs"]}>
                <div className={styles["add-bill-profile"]}>
                    <div className={styles["add-bill-choose-picture"]}
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
                    <div className={styles["add-bill-profile-desc"]}>
                        <DateInput
                            controlledInput={formInputs.dueDate}
                            setControlledInput={(date) => update("dueDate", date)}
                            legend="Next Due Date"
                            name="dueDate"
                            errorMessage={formInputs.dueDate? "":"Please enter the bills next due date"}
                        />
                        <PeriodSelectBillModal
                            selected={period}
                            setSelected={update}
                            legend="Bill Period"
                        />
                    </div>
                </div>
                <TextInput
                    inputDetails={{
                        name: "name",
                        legend: "Bill Name",
                        autoComplete: "none",
                        type: "text",
                        controlledInput: formInputs.name,
                        placeholder: "E.g. Groceries",
                        setControlledInput: (e) => update("name", e.target.value)
                    }}
                    isPassword={false}
                    errorMessage={formInputs.name? "":"Please enter a bill name"}
                />
                <CategoriesSelect
                    selected={formInputs.category}
                    setSelected={(e: string) => update("category", e)}
                    legend="Bill Category"
                />
                <MoneyInput
                    amount={formInputs.amount}
                    currency={formInputs.currency}
                    setAmount={(e) => update("amount", e)}
                    setCurrency={(e) => update("currency", e)}
                    legend="Bill Amount"
                />
            </div>
            {
                billData
                    ?<div className={styles["bill-modal-btns"]}>
                        <Button>Edit Bill</Button>
                        <Button
                            variant="info"
                            onClick={suspend}
                        >{billData.isSuspended? "Resume Bill":"Suspend Bill"}</Button>
                        <Button
                            variant="warning"
                            onClick={cancel}
                        >Cancel Bill</Button>
                        <Button 
                            variant="delete"
                            onClick={remove}
                        >Delete Bill</Button>
                    </div>
                    :<Button>Add Bill</Button>
            }
        </form>
    )
}