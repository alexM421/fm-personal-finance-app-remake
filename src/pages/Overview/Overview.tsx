//CSS
import { useState } from "react"
import IconSettings from "../../assets/IconSettings"
import { useDataContext } from "../../contexts/DataContext"
import Button from "../../shared/Button/Button"
import formatNumber from "../../utils/formatNumber"
import styles from "./Overview.module.css"
import OverviewBudgets from "./OverviewBudgets"
//Overview
import OverviewPots from "./OverviewPots"
import OverviewRecurringBills from "./OverviewRecurringBills"
import OverviewTransactions from "./OverviewTransactions"
import ModalLayout from "../../modals/ModalLayout/ModalLayout"
import SettingsModal from "../../modals/SettingsModal/SettingsModal"
import OverviewStats from "./OverviewStats"

export default function Overview () {
     
    const [settingsDisplay, setSettingsDisplay] = useState(false)

    return(
        <>
            <div className={styles.overview}>
                <div className={styles["overview-header"]}>
                    <h1 className="text-preset-1">Overview</h1>
                    <Button onClick={() => setSettingsDisplay(true)}><IconSettings/></Button>
                </div> 
                <OverviewStats/>
                <div className={styles["overview-main"]}>
                    <div>
                        <OverviewPots/>
                        <OverviewTransactions/>
                    </div>
                    <div>
                        <OverviewBudgets/>
                        <OverviewRecurringBills/>
                    </div>
                </div>
            </div>
            <ModalLayout
                modalTitle="User Setting"
                modalDesc="Change your personnal settings here."
                modalDisplay={settingsDisplay}
                closeModalDisplay={() => setSettingsDisplay(false)}
            >
                <SettingsModal
                    closeModalDisplay={()=>setSettingsDisplay(false)}
                />
            </ModalLayout>
        </>
    )
}