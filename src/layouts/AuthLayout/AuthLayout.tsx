//CSS
import { Outlet } from "react-router"
import styles from "./AuthLayout.module.css"
import useMobileListener from "../../hooks/useMobileListener"

export default function AuthLayout () {

    const { isMobile } = useMobileListener(1200)

    return(
        <div className={styles["auth-layout"]}>
            {!isMobile
                ?<div className={styles["auth-image"]}>
                    <img src="/assets/images/illustration-authentication.svg" alt="Authentification illustration"/>
                    <div>
                        <img src="/assets/images/logo-large.svg" alt="logo"/>
                        <h1 className="text-preset-1">Keep track of your money<br/> and save for your future</h1>
                        <p className="text-preset-4">Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</p>
                    </div>
                </div>
                :<div className={styles["auth-mobile-top"]}><img src="/assets/images/logo-large.svg" alt="logo"/>/</div>    
        }
            <Outlet/>
        </div>
    )
}