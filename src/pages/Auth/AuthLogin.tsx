//CSS
import styles from "./Auth.module.css"
//shared
import Button from "../../shared/Button/Button"
import TextInput from "../../shared/TextInput/TextInput"
//React
import { useState } from "react"
import { Link } from "react-router"
//auth
import { AuthLoginSubmit } from "./AuthLoginSubmit"
import type { errorsObj } from "./AuthLoginSubmit"


export default function AuthLogin () {


    const [emailInput, setEmailInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")
    const [errors, setErrors] = useState<errorsObj>({
        emailErr: false,
        passwordErr: false,
        loginErr: false,
    })


    return(
        <form className={styles.auth} onSubmit={(e) => AuthLoginSubmit(e, setErrors)} noValidate>
            
            <div className={`${styles["auth-headers"]} ${errors.loginErr? styles.error: ""}`}>
                <h1 className="text-preset-1">Login</h1>
                <p className="text-preset-3">{errors.loginErr? "Invalid Credentials":""}</p>
            </div>
            <div>
                <TextInput 
                    inputDetails={{
                        autoComplete: "email",
                        name:"email",
                        type:"email",
                        controlledInput:emailInput, 
                        setControlledInput:setEmailInput,
                    }}
                    isPassword={false}
                    errorMessage={errors.emailErr? "Please enter a valid email":""}
                
                />
                <TextInput
                    inputDetails={{
                        autoComplete: "current-password",
                        name:"password",
                        type: "password",
                        controlledInput: passwordInput,
                        setControlledInput:setPasswordInput,
                    }}
                    isPassword={true}
                    errorMessage={errors.passwordErr? "Please enter your password":""}
                />
            </div>
            <Button>Login</Button>
            <p className="text-preset-4">Need to create an account?<Link to="../signup">Sign Up</Link></p>
        </form>
    )
}