//CSS
import styles from "./MobileNavbar.module.css"
//assets
import IconNavBudgets from "../../../assets/IconNavBudgets"
import IconNavOverview from "../../../assets/IconNavOverview"
import IconNavPots from "../../../assets/IconNavPots"
import IconNavRecurringBills from "../../../assets/IconNavRecurringBills"
import IconNavTransactions from "../../../assets/IconNavTransactions"
//navbar
import NavbarItem from "../NavbarItem"
//react
import { useLocation } from "react-router"

export default function MobileNavbar () {

    const locationPath = useLocation().pathname.slice(1)    

    return(
        <div className={styles["mobile-navbar"]}>
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
    )
}