//CSS
import styles from "./Auth.module.css"
//shared
import Button from "../../shared/Button/Button"
import TextInput from "../../shared/TextInput/TextInput"
//React
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { AuthSignUpSubmit } from "./AuthSignUpSubmit"
import AuthSignUpPopUp from "./AuthSignUpPopUp"


type errorsObj = {
    nameErr: boolean,
    emailErr : boolean,
    passwordErr: boolean,
    signupErr: boolean
}

export default function AuthSignUp ( ) {
    
    const navigate = useNavigate()

    const [nameInput, setNameInput] = useState<string>("")
    const [emailInput, setEmailInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")
    const [isPopUpHidden, setIsPopUpHidden] = useState<boolean>(true)

    const [errors, setErrors] = useState<errorsObj>({
        nameErr: false,
        emailErr: false,
        passwordErr: false,
        signupErr: false,
    })

    return(
        <>
            <form className={styles.auth} onSubmit={(e) => AuthSignUpSubmit(e, setErrors, navigate, setIsPopUpHidden)} noValidate>
                <h1 className="text-preset-1">Sign Up</h1>
                <div>
                    <TextInput
                        inputDetails={{
                            autoComplete: "user",
                            name: "name",
                            type: "text",
                            controlledInput: nameInput,
                            setControlledInput: (e) => setNameInput(e.target.value),
                            placeholder: "John Doe"
                        }}
                        isPassword={false}
                        errorMessage={errors.nameErr? "Please enter a your name":""}
                    />
                    <TextInput 
                        inputDetails={{
                            autoComplete: "email",
                            name: "email",
                            type: "email",
                            controlledInput: emailInput, 
                            setControlledInput: (e) => setEmailInput(e.target.value),
                            placeholder: "email@example.com"
                        }}
                        isPassword={false}
                        errorMessage={errors.emailErr? "Please enter a valid email":""}
                    />
                    <TextInput
                        inputDetails={{
                            autoComplete: "new-password",
                            name: "new-password",
                            legend: "Create password",
                            type: "password",
                            controlledInput: passwordInput,
                            setControlledInput: (e) => setPasswordInput(e.target.value),
                            minLength: 8,
                            placeholder: "123SecurePassword"
                        }}
                        isPassword={true}
                        helperText="Passwords must be at least 8 characters"
                        errorMessage={errors.passwordErr? "Please enter a valid password":""}
                    />
                </div>
                <Button>Create Account</Button>
                <p className="text-preset-4">Already have an account?<Link to="../login">Login</Link></p>
            </form>
            <AuthSignUpPopUp isPopUpHidden={isPopUpHidden}/>
        </>
    )
}