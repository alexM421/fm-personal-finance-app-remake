//react
import { useEffect, useState } from "react"
//contexts
import { useDataContext } from "../../contexts/DataContext"
//types
import type { Budget } from "../../types/DataTypes"
//utils
import syncUserData from "../../utils/syncUserData"


export default function useBudgetModalForm (closeModalDisplay: () => void, budget: Budget | undefined) {

    const { data, setData } = useDataContext()

    const [formInputs, setFormInputs] = useState<Budget>({
        category: "Entertainment",
        maximum: 0,
        theme: "var(--green)"
    })

    useEffect(() => {
        if(budget){
            setFormInputs(budget)
        }
    },[budget])
    

    const update = (
        inputName: string,
        value: string | number,
    ) => {
        setFormInputs(prevInputs => ({...prevInputs, [inputName]: value}))
    }   

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const budgetsArr = budget
            ?[...data.budgets]
                .map(budgetData => budgetData.category===budget.category? formInputs:budgetData)
            :[...data.budgets, formInputs]
        const updatedData = {...data, budgets: budgetsArr}
        syncUserData(updatedData, setData)
        closeModalDisplay()
   

        
    }

    return { formInputs, update, submit }
}