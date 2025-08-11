//CSS
import styles from "./HomeLayout.module.css"
//layouts
import Navbar from "../Navbar/Navbar"
//React
import { Outlet } from "react-router"

export default function HomeLayout () {


    return(
        <div className={styles["home-layout"]}>
            <Navbar/>
            <Outlet/>
        </div>
    )
}