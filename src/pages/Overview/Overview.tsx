//CSS
import { useState } from "react"
import IconSettings from "../../assets/IconSettings"
import Button from "../../shared/Button/Button"
import styles from "./Overview.module.css"
import OverviewBudgets from "./OverviewBudgets"
//Overview
import OverviewPots from "./OverviewPots"
import OverviewRecurringBills from "./OverviewRecurringBills"
import OverviewTransactions from "./OverviewTransactions"
import ModalLayout from "../../modals/ModalLayout/ModalLayout"
import SettingsModal from "../../modals/SettingsModal/SettingsModal"
import OverviewStats from "./OverviewStats"
//assets
import IconExit from "../../assets/IconExit"
//supabase
import { supabase } from "../../supabaseClient"

export default function Overview () {
     
    const [settingsDisplay, setSettingsDisplay] = useState(false)

    const handleSignout = async () => {
        const { error } = await supabase.auth.signOut()
        if(error){
            throw new Error("Couldn't sign out", error)
        }
    }

    return(
        <>
            <div className={styles.overview}>
                <div className={styles["overview-header"]}>
                    <h1 className="text-preset-1">Overview</h1>
                    <div className={styles["overview-btns"]}>
                        <Button onClick={handleSignout}><IconExit/></Button>
                        <Button onClick={() => setSettingsDisplay(true)}><IconSettings/></Button>
                    </div>
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