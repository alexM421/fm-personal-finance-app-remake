//CSS
import { useEffect, useState } from "react"
import styles from "./Auth.module.css"

type AuthSignUpPopUpProps = {
    isPopUpHidden: boolean
}

export default function AuthSignUpPopUp ({ isPopUpHidden }: AuthSignUpPopUpProps) {

    const [timeLeft, setTImeLeft] = useState<number>(10)

    useEffect(() => {
        setTImeLeft(10)
        
        const timer = setInterval(() => {
            setTImeLeft((prevState) => {
                if(prevState<=1){
                    clearInterval(timer)
                    return 0
                }
                
                return prevState - 1
            })
        },1000)

    return () => clearInterval(timer)
    },
    [isPopUpHidden])


    return(
        <div className={`${styles["auth-popup"]} ${isPopUpHidden? styles["auth-popup-hidden"]:""}`}>
            <div>
                <img src="/assets/images/correct.png" alt="checkmark" />
                <h2 className="text-preset-2">Signed up successfull !</h2>
            </div>
            <div>
                <p className="text-preset-4">An email has been sent you awaiting for confirmation. You will be redirect to login in {timeLeft}s.</p>
            </div>
        </div>
    )
}