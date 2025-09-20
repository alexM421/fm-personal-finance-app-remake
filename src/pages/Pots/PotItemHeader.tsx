//CSS
import styles from "./Pots.module.css"
//react
import { useState } from "react"
//shared
import EditBtn from "../../shared/EditBtn/EditBtn"
//modals
import ModalLayout from "../../modals/ModalLayout/ModalLayout"
import PotModal from "../../modals/PotsModal/PotModal"
import DeleteModal from "../../modals/DeleteModal/DeleteModal"
//types
import type { Pot } from "../../types/DataTypes"

type PotItemHeaderProps = {
    pot: Pot
}

export default function PotItemHeader ({ pot }: PotItemHeaderProps) {

    const [displayDelete, setDisplayDelete] = useState<boolean>(false)
    const [displayEdit, setDisplayEdit] = useState<boolean>(false)

    const { theme, name } = pot

    return(
        <>
            <div className={styles["pot-item-header"]}>
                <div>
                    <div 
                        className={styles["pot-item-color-pin"]}
                        style={{backgroundColor: theme}}    
                    ></div>
                    <h1 className="text-preset-2">{name}</h1>
                </div>
                <EditBtn
                    displayDelete={() => setDisplayDelete(true)}
                    displayEdit={() => setDisplayEdit(true)}
                />
            </div>
            <ModalLayout
                modalTitle="Edit pot"
                modalDisplay={displayEdit}
                closeModalDisplay={() => setDisplayEdit(false)}
                modalDesc="Edit pot"
            >
                <PotModal
                    closeModalDisplay={() => setDisplayEdit(false)}
                    pot={pot}
                />
            </ModalLayout>
            <ModalLayout
                modalTitle={`Delete '${pot.name}' ?`}
                modalDisplay={displayDelete}
                closeModalDisplay={() => setDisplayDelete(false)}
                modalDesc="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
            >
                <DeleteModal
                    closeModalDisplay={() => setDisplayDelete(false)}
                    itemToRemove={pot}
                />
            </ModalLayout>
        </>
    )
}