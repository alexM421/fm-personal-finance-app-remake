//supabase
import type { Dispatch, SetStateAction } from "react"
import { supabase } from "../../supabaseClient"
import { useNavigate } from "react-router"

export type errorsObj = {
    nameErr: boolean,
    emailErr : boolean,
    passwordErr: boolean,
    signupErr: boolean,
}

type setStateErrorsObj = React.Dispatch<SetStateAction<errorsObj>>

export async function AuthSignUpSubmit (
        e: React.FormEvent<HTMLFormElement>,
        setErrors: setStateErrorsObj,
        navigate: ReturnType<typeof useNavigate>,
        setIsPopUpHidden: Dispatch<SetStateAction<boolean>>,
    ) {
    
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formElements = form.elements
    
    const tempErrors = {
        nameErr: false,
        emailErr: false,
        passwordErr: false,
        signupErr: false,
    }

    const nameInput = formElements.namedItem("name") as HTMLInputElement
    const emailInput = formElements.namedItem("email") as HTMLInputElement
    const passwordInput = formElements.namedItem("new-password") as HTMLInputElement
    
    const isNameInputValid = nameInput.validity.valid
    const isEmailValid = emailInput.validity.valid
    const isPasswordValid = passwordInput.validity.valid

    tempErrors.nameErr =  !isNameInputValid
    tempErrors.emailErr = !isEmailValid
    tempErrors.passwordErr = !isPasswordValid

    if(isEmailValid && isPasswordValid && isNameInputValid){
        const supabaseData = await supabase.auth.signUp({
            email: emailInput.value,
            password: passwordInput.value,
            options: {
                data: {
                    name: nameInput.value
                }
            }
        })
       const { error } = supabaseData
       //error handling
       const isSignUpValid = !error
       tempErrors.signupErr = !isSignUpValid
    }

    setErrors(tempErrors)
    if(Object.values(tempErrors).every(value => !value)){
        setIsPopUpHidden(false)
        setTimeout(() => navigate("/auth/login"),  10000)
    }
}

