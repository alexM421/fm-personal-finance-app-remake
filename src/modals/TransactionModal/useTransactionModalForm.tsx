//React
import { useState, useEffect } from "react"
//utils
import syncUserData from "../../utils/syncUserData"
//contexts
import { useDataContext } from "../../contexts/DataContext"
//types
import type { AvatarType, Transaction } from "../../types/DataTypes"
import getChangeRate from "../../utils/getChangeRate"
import { type Currency } from "../../contexts/CurrencyContext"
import getSpecificDateRates from "../../utils/getSpecificDateRates"
import { useDateContext } from "../../contexts/DateContext"


export default function useTransactionModalForm (transactionData: Transaction | undefined, closeModalDisplay: () => void) {

    const { data, setData } = useDataContext()
    const datetime = useDateContext().date?.datetime
    

    const [formInputs, setFormInputs] = useState<Transaction>({
        avatar: { theme: "var(--green)", content: "text", isContentImage: false },
        name: "",
        category: "General",
        date: datetime? datetime:new Date().toISOString().slice(0,16),
        amount: 0,
        recurring: false,
        currency: "USD",
        id: crypto.randomUUID(),
        rate: 1.00
    })
    
    const [formError, setFormError] = useState<boolean>(false)

    //If a transaction was passed on init, consider this is an edit and set data to transactionData
    useEffect(() => {
        if(transactionData){
            setFormInputs(transactionData)
        }
    },[])

    useEffect(() => {

        const updateRate = async () => {
            const transactionDate = new Date(formInputs.date)
            const ratesData =  (await getSpecificDateRates(transactionDate)).data

            if(!ratesData || ratesData.length === 0){
               return 
            }

            const rates = ratesData[0]?.rates

            const updatedRate = getChangeRate(
                formInputs.currency as Currency,
                data.personnalSettings.preferredCurrency as Currency,
                rates
            )

            setFormInputs(prevForm => 
                ({
                    ...prevForm, 
                    rate: updatedRate
                })
            )
        }

        updateRate()
        
    },[formInputs.currency])
    
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