//CSS
import { useState, type SetStateAction } from "react"
import styles from "./TextInput.module.css"

type TextInputProps = {
    inputDetails: {
        name: string,
        legend?: string,
        type: string,
        autoComplete: string,
        controlledInput: string,
        setControlledInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
        placeholder: string,
        minLength?: number,
        pattern?: string,
    }
    isPassword: boolean,
    helperText ?: string,
    errorMessage?: string,
    

}

export default function TextInput ({ inputDetails, isPassword, errorMessage, helperText }: TextInputProps) {


    const {name, type, autoComplete, controlledInput, setControlledInput, placeholder } = inputDetails

    const legend = inputDetails?.legend || name
    const minLength = inputDetails?.minLength || 1
    const pattern = inputDetails?.pattern || ""
    
    const [showPassword, setShowPassword] = useState<boolean>(false)

    

    return(
        <div className={`${styles["text-input"]} ${errorMessage? styles["error"]:""}`}>
            <div className={styles["input-header"]}>
                <p className="text-preset-5-bold">{legend}</p>
                <p className="text-preset-5-bold">{errorMessage}</p>
            </div>
            <label htmlFor={name}>
                <input 
                    autoComplete={autoComplete}
                    className="text-preset-4" 
                    id={name}
                    name={name}
                    type={isPassword? (showPassword? "text":"password") :type}
                    value={controlledInput}
                    onChange={setControlledInput}
                    required
                    minLength={minLength - 1}
                    placeholder={placeholder}
                    pattern={pattern || undefined}
                />
                {isPassword
                    ?showPassword
                        ?<button type="button" onClick={() => setShowPassword(false)}>
                            <img src="/assets/images/icon-hide-password.svg" alt="icon hide password"/>
                        </button> 
                        :<button type="button"  onClick={() => setShowPassword(true)}>
                            <img src="/assets/images/icon-show-password.svg" alt="icon show password"/>
                        </button> 
                    :""
                }
            </label>
            <p className="text-preset-5">{helperText}</p>
        </div>
    )
}