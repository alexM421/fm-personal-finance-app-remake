//CSS
import styles from "./Auth.module.css"
//shared
import Button from "../../shared/Button/Button"
import TextInput from "../../shared/TextInput/TextInput"
//React
import { useState } from "react"
import { Link } from "react-router"



export default function AuthLogin () {


    const [emailInput, setEmailInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formElements = form.elements

        const emailInput = formElements.namedItem("email")
        const passwordInput = formElements.namedItem("password")
    }

    return(
        <form className={styles.auth} onSubmit={handleSubmit}>
            <h1 className="text-preset-1">Login</h1>
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
                />
            </div>
            <Button>Login</Button>
            <p className="text-preset-4">Need to create an account?<Link to="../signup">Sign Up</Link></p>
        </form>
    )
}