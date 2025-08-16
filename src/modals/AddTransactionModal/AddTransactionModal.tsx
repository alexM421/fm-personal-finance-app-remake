//CSS
import { useState } from "react"
import Button from "../../shared/Button/Button"
import TextInput from "../../shared/TextInput/TextInput"
import styles from "./AddTransactionModal.module.css"
import type { Transaction } from "../../contexts/DataContext"
import CustomSelect from "../../shared/CustomSelect/CustomSelect"
import DateInput from "../../shared/DateInput/DateInput"



export default function AddTransactionModal () {


    const sortOptions = ["Latest","Oldest","A to Z","Z to A","Highest","Lowest"]

    const [formInputs, setFormInputs] = useState<Transaction>({
        avatar: "",
        name: "",
        category: "",
        date: "",
        amount: 0,
        recurring: false,
        currency: "",
    })

    const handleFormInputsUpdate = 
        (
            inputName: string,
            value: string | number | boolean,
        ) => {
            setFormInputs(prevInputs => 
                ({...prevInputs, [inputName]: value})
        )
    }   

    return(
        <form className={styles["add-transaction-modal"]}>
            <div className={styles["add-transaction-inputs"]}>
                <div className={styles["add-transaction-input"]}>

                </div>
                <TextInput
                    inputDetails={{
                        name: "name",
                        legend: "Transaction name",
                        autoComplete: "none",
                        type: "text",
                        controlledInput: formInputs.name,
                        placeholder: "John Doe",
                        setControlledInput: (e) => handleFormInputsUpdate("name", e.target.value)
                    }}
                    isPassword={false}
                    errorMessage="Please enter a transaction name"
                />
                <div className={styles["add-transaction-input"]}>
                    <p className="text-preset-5-bold">Transaction Category</p>
                    <CustomSelect
                        selected={formInputs.category}
                        setSelected={(value) => handleFormInputsUpdate("category", value)}
                        options={sortOptions}
                    />
                </div>
                <DateInput
                    controlledInput={formInputs.date}
                    setControlledInput={(date) => handleFormInputsUpdate("date", date)}
                    legend="Transaction Date"
                    name="date"
                />
            </div>
            <Button>Add Transaction</Button>
        </form>
    )
}