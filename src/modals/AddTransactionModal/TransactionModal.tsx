//CSS
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import Button from "../../shared/Button/Button"
import TextInput from "../../shared/TextInput/TextInput"
import styles from "./TransactionModal.module.css"
import { useDataContext} from "../../contexts/DataContext"
import CustomSelect from "../../shared/CustomSelect/CustomSelect"
import DateInput from "../../shared/DateInput/DateInput"
import MoneyInput from "../../shared/MoneyInput/MoneyInput"
import Avatar from "../../shared/Avatar/Avatar"
import AddTransactionmodalPicturePopUp from "./TransactionModalPicturePopUp"
import type { Transaction, AvatarType } from "../../types/DataTypes"
import syncUserData from "../../utils/syncUserData"


type AddTransactionModalProps = {
    closeModalDisplay: () => void,
    transactionData?: Transaction,
}

export default function TransactionModal ({ closeModalDisplay, transactionData }: AddTransactionModalProps) {

    const { data, setData } = useDataContext()

    const [displayChoosePicture, setDisplayChoosePicture] = useState<boolean>(false)
    const [formInputs, setFormInputs] = useState<Transaction>({
        avatar: { theme: "var(--green)", content: "text", isContentImage: false },
        name: "",
        category: "General",
        date: "",
        amount: 0,
        recurring: false,
        currency: "USD",
        id: crypto.randomUUID()
    })
    const [formError, setFormError] = useState<boolean>(false)

    useEffect(() => {
        if(transactionData){
            setFormInputs(transactionData)
        }
    },[])

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

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const id = transactionData?.id
        const transactionsArr = [...data.transactions]
        const deleteIndex= transactionsArr.findIndex(transaction => transaction.id === id)
        const splicedTransactionArr = transactionsArr.splice(deleteIndex,1)
        const updatedData = { ...data, transactions: transactionsArr}
        syncUserData(updatedData, setData)
        closeModalDisplay()
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { name, date } = formInputs
        if(!name || !date){
            setFormError(true)
            return
        }else if(transactionData){
            //need to delete old transactionData first
            const id = transactionData.id
            const transactionsArr = [...data.transactions].map(transaction => {
                if(transaction.id === id){
                    return formInputs
                }else{
                    return transaction
                }
            })
            const updatedData = {...data, transactions: transactionsArr}
            syncUserData(updatedData, setData)
            closeModalDisplay()

        }else{
            const transactionsArr = [...data.transactions, formInputs]
            const updatedData = {...data, transactions: transactionsArr}
            syncUserData(updatedData, setData)
            closeModalDisplay()
        }
    }

    return(
        <form 
            className={styles["add-transaction-modal"]}
            onSubmit={handleSubmit}
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
            {
                transactionData
                    ?<div className={styles["transaction-modal-btns"]}>
                        <Button 
                            variant="delete"
                            onClick={handleDelete}
                        >Delete Transaction</Button>
                        <Button>Edit Transaction</Button>
                    </div>
                    :<Button>Add Transaction</Button>
            }
            
        </form>
    )
}