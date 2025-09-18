//supabase
import type { useNavigate } from "react-router"
import { supabase } from "../../supabaseClient"
//react
import type { SetStateAction } from "react"

type setStateErrorsObj = React.Dispatch<SetStateAction<boolean>>

export async function AuthResetSubmit (
        e: React.FormEvent<HTMLFormElement>,
        setErrors: setStateErrorsObj,
        navigate: ReturnType<typeof useNavigate>
    ){

        e.preventDefault()
        
        const form = e.target as HTMLFormElement
        const formElements = form.elements
        
        let tempErrors = false

        const emailInput = formElements.namedItem("email") as HTMLInputElement
        const isEmailValid = emailInput.validity.valid

        tempErrors = !isEmailValid

        if(isEmailValid){
            const supabaseData = await supabase.auth.resetPasswordForEmail(emailInput.value,{redirectTo: "http://localhost:5173/auth/update"})
            const { error } = supabaseData
            if(error){
                console.log("Couldn't send email.")
            }else{
                navigate("/auth/login")
            }
        }
    
    setErrors(tempErrors)    
}