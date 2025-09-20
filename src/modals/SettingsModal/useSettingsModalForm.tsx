//React
import { useEffect, useState } from "react"
//Types
import type { PersonnalSettings } from "../../types/DataTypes"
import { useCurrencyContext } from "../../contexts/CurrencyContext"
import { useDataContext } from "../../contexts/DataContext"
import syncUserData from "../../utils/syncUserData"

export default function useSettingsModalForm (closeModalDisplay: () => void) {

    const { data: { personnalSettings }, data, setData} = useDataContext()
    const rates  = useCurrencyContext()

    const [formInputs, setFormInputs] = useState<PersonnalSettings>({
        budgetCycleDay: 1,
        preferredCurrency: "USD",
        originalBalance: 0,
    })

    
    useEffect(() => {
        setFormInputs({
            budgetCycleDay: personnalSettings.budgetCycleDay,
            preferredCurrency: personnalSettings.preferredCurrency,
            originalBalance: personnalSettings.originalBalance
        })
    },[])

    const update = 
    (
        inputName: string,
        value: string | number,
    ) => setFormInputs(prevInputs => ({...prevInputs, [inputName]: value}))        
    
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const updatedPersonnalSettings = {...personnalSettings, ...formInputs}
        const updatedData = {...data, personnalSettings: updatedPersonnalSettings}
        syncUserData(updatedData, setData)
        closeModalDisplay()
    }

    
    const monthDays = [
        "1","2","3","4","5","6","7","8","9","10",
        "11","12","13","14","15","16","17","18","19","20",
        "21","22","23","24","25","26","27","28","29","30",
        "31"
    ]

    const currenciesArr = rates 
        ?Object.keys(rates)
        :[] 

    return {
        formInputs,
        update,
        submit,
        monthDays,
        currenciesArr,
    }
}