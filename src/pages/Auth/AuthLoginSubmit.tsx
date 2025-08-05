//supabase
import type { SetStateAction } from "react"
import { supabase } from "../../../supabaseClient"

export type errorsObj = {
    emailErr : boolean,
    passwordErr: boolean,
    loginErr: boolean,
}

type setStateErrorsObj = React.Dispatch<SetStateAction<errorsObj>>

export async function AuthLoginSubmit (e: React.FormEvent<HTMLFormElement>, setErrors: setStateErrorsObj ) {

    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formElements = form.elements
    
    const tempErrors = {
        emailErr: false,
        passwordErr: false,
        loginErr: false,
    }

    const emailInput = formElements.namedItem("email") as HTMLInputElement
    const passwordInput = formElements.namedItem("password") as HTMLInputElement
    
    const isEmailValid = emailInput.validity.valid
    const isPasswordValid = passwordInput.validity.valid

    tempErrors.emailErr = !isEmailValid
    tempErrors.passwordErr = !isPasswordValid

    if(isEmailValid && isPasswordValid){
        const supabaseData = await supabase.auth.signInWithPassword({
            email: emailInput.value,
            password: passwordInput.value,
        })
       const { data, error } = supabaseData
       //error handling
       const isLoginValid = !error
       tempErrors.loginErr = !isLoginValid
       console.log(supabaseData)
    }

    setErrors(tempErrors)
    
}