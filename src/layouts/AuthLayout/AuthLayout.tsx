//CSS
import { Outlet } from "react-router"
import styles from "./AuthLayout.module.css"

export default function AuthLayout () {




    return(
        <div className={styles["auth-layout"]}>
            <img/>
            <Outlet/>
        </div>
    )
}