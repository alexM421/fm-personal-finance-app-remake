//CSS
import styles from "./Pots.module.css"
//types
import type { Pot } from "../../types/DataTypes"
import PotItemHeader from "./PotItemHeader"
import PotItemProgress from "./PotItemProgress"
import Button from "../../shared/Button/Button"

type PotItemProps = {
    pot: Pot
}

export default function PotItem ({ pot }: PotItemProps ) {

    const { theme, target, total } = pot

    return(
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
                <Button>+ Add Money</Button>
                <Button>Withdraw</Button>
            </div>
        </div>
    )
}