//CSS
import styles from "./Auth.module.css"
//React
import { Link, useNavigate } from "react-router"
import { useState } from "react"
//Shared
import TextInput from "../../shared/TextInput/TextInput"
import Button from "../../shared/Button/Button"
//Auth
import { AuthResetSubmit } from "./AuthResetSubmit"

export default function AuthReset () {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)

    return(
        <form className={styles.auth} onSubmit={(e) => AuthResetSubmit(e, setError, navigate)} noValidate>
                <h1 className="text-preset-1">Reset Password</h1>
                <div className={styles["auth-form"]}>
                    <TextInput
                        inputDetails={{
                            autoComplete: "email",
                            name: "email",
                            type: "text",
                            controlledInput: email,
                            setControlledInput: (e) => setEmail(e.target.value),
                            placeholder: "email@example.com"
                        }}
                        isPassword={false}
                        errorMessage={error? "Please enter a your email":""}
                    />
                </div>
                <Button>Send Reset Email</Button>
                <div className={styles["auth-links"]}>
                    <p className="text-preset-4">Already have an account?<Link to="../login">Login</Link></p>
                    <p className="text-preset-4">Need to create an account?<Link to="../signup">Sign Up</Link></p>
                </div>
            </form>
    )
}