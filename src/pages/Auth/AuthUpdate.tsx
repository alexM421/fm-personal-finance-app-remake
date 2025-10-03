//CSS
import styles from "./Auth.module.css"
//React
import { Navigate, useNavigate } from "react-router"
import { useState } from "react"
//Shared
import TextInput from "../../shared/TextInput/TextInput"
import Button from "../../shared/Button/Button"
//Auth
import { AuthUpdateSubmit } from "./AuthUpdateSubmit"
//contexts
import { useAuthContext } from "../../contexts/AuthContext"

export default function AuthUpdate () {

     const { loading, auth } = useAuthContext()

    if(!auth && !loading){
        console.log(auth, loading)
        return(
            <Navigate to="/auth/login"/>
        )
    }

    const navigate = useNavigate()

    const [passwordInput, setPasswordInput] = useState("")
    const [confirmedInput, setConfirmedInput] = useState("")
    const [errors, setErrors] = useState({
        passwordErr: false,
        confirmedErr: false,
    })

    return(
        <form className={styles.auth} onSubmit={(e) => AuthUpdateSubmit(e, setErrors, navigate)} noValidate>
                <h1 className="text-preset-1">Reset Password</h1>
                <div className={styles["auth-form"]}>
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
                    <TextInput
                        inputDetails={{
                            autoComplete: "",
                            name: "confirm-password",
                            legend: "Confirm password",
                            type: "password",
                            controlledInput: confirmedInput,
                            setControlledInput: (e) => setConfirmedInput(e.target.value),
                            minLength: 8,
                            placeholder: "123SecurePassword"
                        }}
                        isPassword={true}
                        helperText="Passwords must be at least 8 characters"
                        errorMessage={errors.passwordErr? "Please enter a valid password":""}
                    />
                </div>
                <Button>Reset Password</Button>
            </form>
    )
}