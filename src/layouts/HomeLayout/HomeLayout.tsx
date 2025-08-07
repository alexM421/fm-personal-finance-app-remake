//CSS
import Navbar from "../Navbar/Navbar"
import styles from "./HomeLayout.module.css"

export default function HomeLayout () {


    return(
        <div className={styles["home-layout"]}>
            <Navbar/>
        </div>
    )
}