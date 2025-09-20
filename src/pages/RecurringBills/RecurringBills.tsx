//CSS
import styles from "./RecurringBills.module.css"
//react
import { useState } from "react"
//shared
import PageHeader from "../../components/PageHeader/PageHeader"
import RecurringBillsTotal from "./RecurringBillsTotal"
import RecurringBillsSummary from "./RecurringBillsSummary"
import RecurringBillsTable from "./RecurringBillsTable/RecurringBillsTable"
//modals
import ModalLayout from "../../modals/ModalLayout/ModalLayout"
import BillModal from "../../modals/BillModal/BillModal"


export default function RecurringBills () {

    const [showModal, setShowModal] = useState<boolean>(false)

    

    return(
        <>
            <div className={styles["recurring-bills"]}>
                <PageHeader
                    pageTitle="Recurring Bills"
                    btnTxt="+ Add Recurring Bill"
                    toggleState={setShowModal}
                />
                <div className={styles["recurring-bills-main"]}>
                    <div className={styles["recurring-bills-infos"]}>
                        <RecurringBillsTotal/>
                        <RecurringBillsSummary/>
                    </div>
                    <RecurringBillsTable/>
                </div>
            </div>
            <ModalLayout
                modalTitle="Add New Bill"
                modalDesc="Adding a new bill"
                modalDisplay={showModal}
                closeModalDisplay={() => setShowModal(false)}
            >
                <BillModal
                    closeModalDisplay={() => setShowModal(false)}
                />
            </ModalLayout>
        </>
    )
}