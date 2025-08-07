//CSS
import styles from "./Navbar.module.css"
//assets
import IconNavBudgets from "../../assets/IconNavBudgets"
import IconNavOverview from "../../assets/IconNavOverview"
import IconNavPots from "../../assets/IconNavPots"
import IconNavRecurringBills from "../../assets/IconNavRecurringBills"
import IconNavTransactions from "../../assets/IconNavTransactions"
import IconMinimize from "../../assets/IconMinimize"
//navbar
import NavbarItem from "./NavbarItem"
import { useLocation } from "react-router"
import { useState } from "react"

export default function Navbar () {

    const [isMinimized, setIsMinimized] = useState<boolean>(false)
    
    const locationPath = useLocation().pathname.slice(1)    

    return(
        <div className={`${styles.navbar} ${isMinimized && styles["mini-navbar"]}`}>
            {isMinimized
                ?<img src="/assets/images/logo-small.svg"/>
                :<img src="/assets/images/logo-large.svg"/>
            }
            <div className={styles["navbar-items"]}>
                <NavbarItem
                    svgElement={<IconNavOverview/>}
                    title="Overview"
                    link="overview"
                    isActive={locationPath==="overview"}
                />
                <NavbarItem
                    svgElement={<IconNavTransactions/>}
                    title="Transactions"
                    link="transactions"
                    isActive={locationPath==="transactions"}
                />
                <NavbarItem
                    svgElement={<IconNavBudgets/>}
                    title="Budgets"
                    link="budgets"
                    isActive={locationPath==="budgets"}
                />
                <NavbarItem
                    svgElement={<IconNavPots/>}
                    title="Pots"
                    link="pots"
                    isActive={locationPath==="pots"}
                />
                <NavbarItem
                    svgElement={<IconNavRecurringBills/>}
                    title="Recurring Bills"
                    link="recurring-bills"
                    isActive={locationPath==="recurring-bills"}
                />
            </div>
            <div
                className={`${styles["navbar-toggle"]} ${styles["navbar-item"]}`}
                onClick={() => setIsMinimized(prevState => !prevState)}    
            >
                <IconMinimize/>
                <p className="text-preset-3">Minimize Menu</p>
            </div>
        </div>
    )
}