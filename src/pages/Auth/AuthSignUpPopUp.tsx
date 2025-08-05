//CSS
import styles from "./Auth.module.css"

type AuthSignUpPopUpProps = {
    isPopUpHidden: boolean
}

export default function AuthSignUpPopUp ({ isPopUpHidden }: AuthSignUpPopUpProps) {



    return(
        <div className={`${styles["auth-popup"]} ${isPopUpHidden? styles["auth-popup-hidden"]:""}`}>
            <div>
                <img src="/assets/images/correct.png" alt="checkmark" />
                <h2 className="text-preset-2">Signed up successfull !</h2>
            </div>
            <div>
                <p className="text-preset-4">An email has been sent you awaiting for confirmation. You will be redirect to login in 10s.</p>
            </div>
        </div>
    )
}