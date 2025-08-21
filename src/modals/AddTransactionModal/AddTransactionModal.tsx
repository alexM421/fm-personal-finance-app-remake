//CSS
import { useState } from "react"
import Button from "../../shared/Button/Button"
import TextInput from "../../shared/TextInput/TextInput"
import styles from "./AddTransactionModal.module.css"
import type { AvatarType, Transaction } from "../../contexts/DataContext"
import CustomSelect from "../../shared/CustomSelect/CustomSelect"
import DateInput from "../../shared/DateInput/DateInput"
import MoneyInput from "../../shared/MoneyInput/MoneyInput"
import Avatar from "../../shared/Avatar/Avatar"
import AddTransactionmodalPicturePopUp from "./AddTransactionModalPicturePopUp"



export default function AddTransactionModal () {


    const [displayChoosePicture, setDisplayChoosePicture] = useState<boolean>(false)
    const [formInputs, setFormInputs] = useState<Transaction>({
        avatar: { theme: "", content: "", isContentImage: false },
        name: "",
        category: "General",
        date: "",
        amount: 0,
        recurring: false,
        currency: "USD",
    })
    
    const categories = ["Entertainment","Bills","Groceries","Dining Out","Transportation","Personal Care","Education","Lifestyle","Shopping","General"]
    
    const handleFormInputsUpdate = 
        (
            inputName: string,
            value: string | number | boolean | AvatarType | Partial<AvatarType>,
        ) => {
            setFormInputs(prevInputs => {
                if(inputName === "avatar" && typeof(value)==="object"){
                    return{
                        ...prevInputs,
                        avatar: {
                            ...prevInputs.avatar,
                            ...value,
                        }
                    }
                }else{
                    return({...prevInputs, [inputName]: value})
                }
            }
        )
    }   

    return(
        <form className={styles["add-transaction-modal"]}>
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
                            setAvatar={(e) => handleFormInputsUpdate("avatar", e)}
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
                                setControlledInput: (e) => handleFormInputsUpdate("name", e.target.value)
                            }}
                            isPassword={false}
                            errorMessage={formInputs.name? "":"Please enter a transaction name"}
                        />
                        <DateInput
                            controlledInput={formInputs.date}
                            setControlledInput={(date) => handleFormInputsUpdate("date", date)}
                            legend="Transaction Date"
                            name="date"
                            errorMessage={formInputs.date? "":"Please enter a transaction date"}
                        />
                    </div>
                </div>
                <div className={styles["add-transaction-input"]}>
                    <p className="text-preset-5-bold">Transaction Category</p>
                    <CustomSelect
                        selected={formInputs.category}
                        setSelected={(value) => handleFormInputsUpdate("category", value)}
                        options={categories}
                        hasSearch={false}
                    />
                </div>
                <MoneyInput
                    amount={formInputs.amount}
                    currency={formInputs.currency}
                    setAmount={(e) => handleFormInputsUpdate("amount", e)}
                    setCurrency={(e) => handleFormInputsUpdate("currency", e)}
                />
            </div>
            <Button>Add Transaction</Button>
        </form>
    )
}