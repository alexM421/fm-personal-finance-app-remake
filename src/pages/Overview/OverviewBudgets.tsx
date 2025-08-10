//CSS
import styles from "./Overview.module.css"
//overview
import OverviewHeader from "./OverviewHeader"
//shared
import Infographic from "../../shared/Infographic/Infographic"
//contexts
import { useDataContext } from "../../contexts/DataContext"


export default function OverviewBudgets () {

    const { data } = useDataContext()

    return(
        <div className={styles["overview-budgets"]}>
            <OverviewHeader
                title="Budgets"
                link="/budgets"
                btnDesc="See Details"
            />
            <div className={styles["overview-budgets-main"]}>
                <Infographic/>
            </div>
        </div>
    )
}