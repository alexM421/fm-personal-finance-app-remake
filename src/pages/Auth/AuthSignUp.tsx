//CSS
import styles from "./Auth.module.css"
//shared
import Button from "../../shared/Button/Button"
import TextInput from "../../shared/TextInput/TextInput"
//React
import { useState } from "react"
import { Link } from "react-router"



export default function AuthSignUp ( ) {
    
    const [emailInput, setEmailInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")
    const [nameInput, setNameInput] = useState<string>("")

    return(
        <form className={styles.auth}>
            <h1 className="text-preset-1">Login</h1>
            <div>
                <TextInput
                    inputDetails={{
                        autoComplete: "user",
                        name: "name",
                        type: "text",
                        controlledInput: nameInput,
                        setControlledInput: setNameInput,
                    }}
                    isPassword={true}
                />
                <TextInput 
                    inputDetails={{
                        autoComplete: "email",
                        name: "email",
                        type: "email",
                        controlledInput: emailInput, 
                        setControlledInput: setEmailInput,
                    }}
                    isPassword={false}
                />
                <TextInput
                    inputDetails={{
                        autoComplete: "new-password",
                        name: "new-password",
                        legend: "Create password",
                        type: "password",
                        controlledInput: passwordInput,
                        setControlledInput: setPasswordInput,
                    }}
                    isPassword={true}
                />
            </div>
            <Button>Create Account</Button>
            <p className="text-preset-4">Already have an account?<Link to="../login">Login</Link></p>
        </form>
    )
}