//CSS
import styles from "./Pots.module.css"
//react
import { useState } from "react"
//shared
import PageHeader from "../../components/PageHeader/PageHeader"
//modals
import ModalLayout from "../../modals/ModalLayout/ModalLayout"
import PotModal from "../../modals/PotsModal/PotModal"
import { useDataContext } from "../../contexts/DataContext"
import PotItem from "./PotItem"

export default function Pots () {

    const { data: { pots } } = useDataContext()

    const [modalDisplay, setModalDisplay] = useState<boolean>(false)

    return(
        <>
            <div className={styles.pots}>
                <PageHeader
                    pageTitle="Pots"
                    btnTxt="+ Add New Pot"
                    toggleState={setModalDisplay}
                />
                <div className={styles["pots-main"]}>
                    {pots.map(pot => <PotItem pot={pot} key={`pot-item-${pot.id}`}/>)}
                </div>
            </div>
            <ModalLayout
                modalTitle="Add New Pot"
                modalDesc="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
                modalDisplay={modalDisplay}
                closeModalDisplay={() => setModalDisplay(false)}
            >
                <PotModal
                    closeModalDisplay={() => setModalDisplay(false)}
                />
            </ModalLayout>
        </>
    )
}