//CSS
import styles from "./Pots.module.css"
//types
import type { Pot } from "../../types/DataTypes"
import PotItemHeader from "./PotItemHeader"
import PotItemProgress from "./PotItemProgress"
import Button from "../../shared/Button/Button"
import { useState } from "react"
import ModalLayout from "../../modals/ModalLayout/ModalLayout"
import ChangePotMoneyModal from "../../modals/PotsModal/ChangePotMoneyModal"

type PotItemProps = {
    pot: Pot
}

export default function PotItem ({ pot }: PotItemProps ) {

    const { theme, target, total } = pot

    const [addDisplay, setAddDisplay] = useState<boolean>(false)
    const [withdrawDisplay, setWithdrawDisplay] = useState<boolean>(false)

    return(
        <>
            <div className={styles["pot-item"]}>
                <PotItemHeader
                    pot={pot}
                />
                <PotItemProgress
                    theme={theme}
                    target={target}
                    total={total}
                />
                <div className={styles["pot-item-btns"]}>
                    <Button onClick={() => setAddDisplay(true)}>+ Add Money</Button>
                    <Button onClick={() => setWithdrawDisplay(true)}>Withdraw</Button>
                </div>
            </div>
            <ModalLayout
                modalTitle={`Add to '${pot.name}'`}
                modalDesc="Add money to this pot."
                modalDisplay={addDisplay}
                closeModalDisplay={() => setAddDisplay(false)}
            >
                <ChangePotMoneyModal
                    closeModalDisplay={() => setAddDisplay(false)}
                    pot={pot}
                    isWithdraw={false}
                />
            </ModalLayout>
            <ModalLayout
                modalTitle={`Withdraw from '${pot.name}'`}
                modalDesc="Withdraw money from this pot."
                modalDisplay={withdrawDisplay}
                closeModalDisplay={() => setWithdrawDisplay(false)}
            >
                <ChangePotMoneyModal
                    closeModalDisplay={() => setWithdrawDisplay(false)}
                    pot={pot}
                    isWithdraw={true}
                />
            </ModalLayout>
        </>
    )
}