//supabase
import { supabase } from "../../supabaseClient"
//react
import type { useNavigate } from "react-router"


type errorsObj = {
    passwordErr: boolean,
    confirmedErr: boolean
}

type setStateErrorsObj = React.Dispatch<React.SetStateAction<errorsObj>>

export async function AuthUpdateSubmit (
        e: React.FormEvent<HTMLFormElement>,
        setErrors: setStateErrorsObj,
        navigate: ReturnType<typeof useNavigate>
    ){

        e.preventDefault()
        
        const form = e.target as HTMLFormElement
        const formElements = form.elements
        
        const passwordInput = formElements.namedItem("new-password") as HTMLInputElement
        const confirmedInput = formElements.namedItem("confirm-password") as HTMLInputElement
        
        const isPasswordValid = passwordInput.validity.valid
        const isConfirmValid = confirmedInput.validity.valid && passwordInput.value === confirmedInput.value

        const tempErrors = {
            passwordErr: isPasswordValid,
            confirmedErr: isConfirmValid
        }

        if(isConfirmValid && isPasswordValid){
            const supabaseData = await supabase.auth.updateUser({ password: passwordInput.value})
            const { error } = supabaseData
            if(error){
                console.log("Couldn't reset password.")
            }else{
                navigate("/overview")
            }
        }
    
    setErrors(tempErrors)    
}