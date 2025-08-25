//React
import { useState, useEffect } from "react"
//utils
import syncUserData from "../../utils/syncUserData"
//contexts
import { useDataContext } from "../../contexts/DataContext"
//types
import type { AvatarType, Transaction } from "../../types/DataTypes"


export default function useTransactionModalForm (transactionData: Transaction | undefined, closeModalDisplay: () => void) {

    const { data, setData } = useDataContext()

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

    //If a transaction was passed on init, consider this is an edit and set data to transactionData
    useEffect(() => {
        if(transactionData){
            setFormInputs(transactionData)
        }
    },[])
    
    const update = 
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

    const remove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const id = transactionData?.id
        const transactionsArr = [...data.transactions]
        const deleteIndex = transactionsArr.findIndex(transaction => transaction.id === id)
        transactionsArr.splice(deleteIndex,1)
        const updatedData = { ...data, transactions: transactionsArr}
        syncUserData(updatedData, setData)
        closeModalDisplay()
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { name, date } = formInputs
        if(!name || !date){
            setFormError(true)
            return
        }else if(transactionData){
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

    return { formInputs, formError, update, remove, submit }
}