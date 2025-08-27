//react
import { useState } from "react"
//contexts
import { useDataContext } from "../../contexts/DataContext"
//types
import type { Budget } from "../../types/DataTypes"
//utils
import syncUserData from "../../utils/syncUserData"


export default function useBudgetModalForm (closeModalDisplay: () => void) {

    const { data, setData } = useDataContext()

    const [formInputs, setFormInputs] = useState<Budget>({
        category: "Entertainment",
        maximum: 0,
        theme: "var(--green)"
    })

    

    const update = (
        inputName: string,
        value: string | number,
    ) => {
        setFormInputs(prevInputs => ({...prevInputs, [inputName]: value}))
    }   

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const budgetsArr = [...data.budgets, formInputs]
        const updatedData = {...data, budgets: budgetsArr}
        syncUserData(updatedData, setData)
        closeModalDisplay()
        
    }

    return { formInputs, update, submit }
}