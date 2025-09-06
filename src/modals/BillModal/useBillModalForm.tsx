//React
import { useState, useEffect } from "react"
//utils
import syncUserData from "../../utils/syncUserData"
//contexts
import { useDataContext } from "../../contexts/DataContext"
import { useDateContext } from "../../contexts/DateContext"
//types
import type { AvatarType, Bill } from "../../types/DataTypes"
import getDueDate from "../../utils/getDueDate"


export default function useBillModalForm (billData: Bill | undefined, closeModalDisplay: () => void) {

    const { data, setData } = useDataContext()
    const datetime = useDateContext().date?.datetime
    

    const [formInputs, setFormInputs] = useState<Bill>({
        id: crypto.randomUUID(),
        name: "",
        avatar: { theme: "var(--green)", content: "text", isContentImage: false },
        category: "General",
        date: datetime? datetime:"",
        period: "Monthly",
        dueDate: "",
        amount: 0,
        currency: "USD",
    })
    
    const [formError, setFormError] = useState<boolean>(false)

    const { dueDate, date, period }= formInputs

    //If a transaction was passed on init, consider this is an edit and set data to transactionData
    useEffect(() => {
        if(billData){
            setFormInputs(billData)
        }
    },[])

    useEffect(() => {
        setFormInputs(prevForm => ({
            ...prevForm, 
            dueDate: getDueDate(dueDate || date, period)
        }))
    },[formInputs.date,formInputs.period])
    
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
        const id = billData?.id
        const billsArr = [...data.bills]
        const deleteIndex = billsArr.findIndex(bill => bill.id === id)
        billsArr.splice(deleteIndex,1)
        const updatedData = { ...data, bills: billsArr}
        syncUserData(updatedData, setData)
        closeModalDisplay()
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { name, date } = formInputs
        if(!name || !date){
            setFormError(true)
            return
        }else if(billData){
            const id = billData.id
            const billsArr = [...data.bills].map(bill => {
                if(bill.id === id){
                    return formInputs
                }else{
                    return bill
                }
            })
            const updatedData = {...data, bills: billsArr}
            syncUserData(updatedData, setData)
            closeModalDisplay()

        }else{
            const billsArr = [...data.bills, formInputs]
            const updatedData = {...data, bills: billsArr}
            syncUserData(updatedData, setData)
            closeModalDisplay()
        }
    }

    return { formInputs, formError, update, remove, submit }
}