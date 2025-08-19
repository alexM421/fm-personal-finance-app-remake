//CSS
import styles from "./HomeLayout.module.css"
//layouts
import Navbar from "../Navbar/Navbar"
//React
import { Navigate, Outlet } from "react-router"
//contexts
import { useAuthContext } from "../../contexts/AuthContext"


export default function HomeLayout () {

    const { loading, auth } = useAuthContext()

    if(!auth && !loading){
        return(
            <Navigate to="/auth/login"/>
        )
    }

    return(
        <div className={styles["home-layout"]}>
            <Navbar/>
            <Outlet/>
        </div>
    )
}