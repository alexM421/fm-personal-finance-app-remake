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

    const [error, setError]  = useState<boolean>(false)
    const [formInputs, setFormInputs] = useState<Budget>({
        category: "Select a category",
        maximum: 0,
        theme: "var(--green)",
        id: crypto.randomUUID(),
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
        if(formInputs.category==="Select a category"){
            setError(true)
            return
        }
        const budgetsArr = budget
            ?[...data.budgets]
                .map(budgetData => budgetData.category===budget.category? formInputs:budgetData)
            :[...data.budgets, formInputs]
        const updatedData = {...data, budgets: budgetsArr}
        syncUserData(updatedData, setData)
        closeModalDisplay()
   

        
    }

    const filteredOptions = budget
    ? [...data.budgets].filter(budgetData => budgetData.id !== budget?.id)
    : [...data.budgets] 

    const disabledOptions = filteredOptions.map(budget => budget.category)

    return { formInputs, update, submit, disabledOptions, error }
}