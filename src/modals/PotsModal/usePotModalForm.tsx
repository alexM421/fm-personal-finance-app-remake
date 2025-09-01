//react
import { useEffect, useState } from "react"
//contexts
import { useDataContext } from "../../contexts/DataContext"
//types
import type { Pot } from "../../types/DataTypes"
//utils
import syncUserData from "../../utils/syncUserData"


export default function usePotModalForm (closeModalDisplay: () => void, pot: Pot | undefined) {

    const { data, setData } = useDataContext()

    const [error, setError]  = useState<boolean>(false)
    const [formInputs, setFormInputs] = useState<Pot>({
        name: "",
        target: 0,
        total: 0,
        theme: "var(--green)",
        id: crypto.randomUUID(),
    })

    useEffect(() => {
        if(pot){
            setFormInputs(pot)
        }
    },[pot])
    

    const update = (
        inputName: string,
        value: string | number,
    ) => {
        setFormInputs(prevInputs => ({...prevInputs, [inputName]: value}))
    }   

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!formInputs.name){
            setError(true)
            return
        }
        const potsArr = pot
            ?[...data.pots]
                .map(potsData => potsData.id===pot.id? formInputs:potsData)
            :[...data.pots, formInputs]
        const updatedData = {...data, pots: potsArr}
        syncUserData(updatedData, setData)
        closeModalDisplay()
   

        
    }

    return { formInputs, update, submit, error }
}