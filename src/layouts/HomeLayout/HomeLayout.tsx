//CSS
import styles from "./HomeLayout.module.css"
//layouts
import Navbar from "../Navbar/Navbar"
import MobileNavbar from "../Navbar/MobileNavbar/MobileNavbar"
//React
import { Navigate, Outlet, useLocation } from "react-router"
//contexts
import { useAuthContext } from "../../contexts/AuthContext"
//hooks
import useSyncBill from "../../hooks/useSyncBill"
import useMobileListener from "../../hooks/useMobileListener"


export default function HomeLayout () {
    
    const { pathname } = useLocation()
    const { loading, auth } = useAuthContext()

    if(!auth && !loading){
        console.log("redirected to login")
        return(
            <Navigate to="/auth/login"/>
        )
    }
    if(pathname==="/"){
        return(
            <Navigate to="/overview"/>
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