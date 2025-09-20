//CSS
import styles from "./HomeLayout.module.css"
//layouts
import Navbar from "../Navbar/Navbar"
//React
import { Navigate, Outlet } from "react-router"
//contexts
import { useAuthContext } from "../../contexts/AuthContext"
//hooks
import useSyncBill from "../../hooks/useSyncBill"
import useMobileListener from "../../hooks/useMobileListener"
import MobileNavbar from "../Navbar/MobileNavbar/MobileNavbar"


export default function HomeLayout () {

    const { loading, auth } = useAuthContext()

    if(!auth && !loading){
        console.log("redirected to login")
        return(
            <Navigate to="/auth/login"/>
        )
    }

    //effets
    const { isMobile } = useMobileListener(1000)
    useSyncBill()

    return(
        <div className={styles["home-layout"]}>
            {isMobile? <MobileNavbar/>:<Navbar/>}
            <Outlet/>
        </div>
    )
}