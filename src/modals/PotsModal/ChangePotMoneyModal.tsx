//CSS
import { useState } from "react"
import PotItemProgress from "../../pages/Pots/PotItemProgress"
import Button from "../../shared/Button/Button"
import NumberInput from "../../shared/NumberInput/NumberInput"
import styles from "./PotModal.module.css"
import type { Pot } from "../../types/DataTypes"
import { useDataContext } from "../../contexts/DataContext"
import syncUserData from "../../utils/syncUserData"

type ChangePotMoneyModalProps = {
    closeModalDisplay: () => void,
    pot: Pot,
    isWithdraw: boolean
}

export default function ChangePotMoneyModal ({ closeModalDisplay, pot, isWithdraw }: ChangePotMoneyModalProps) {
    
    const { data, setData  } = useDataContext()

    const { theme, target, total, id } = pot

    const [amount, setAmount] = useState<number>(0)

    const modifiedTotal = isWithdraw
        ?total-amount
        :total+amount

    const max = isWithdraw? total:target-total

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const updatedPot = { ...pot, total: modifiedTotal}
        const updatedPotsArr = [...data.pots].map(pot => pot.id === id ? updatedPot:pot)
        const updatedData = {...data, pots: updatedPotsArr}
        syncUserData(updatedData, setData)
        closeModalDisplay()
    }

    return(
        <form className={styles["change-pot-money"]} onSubmit={submit}>
            <PotItemProgress
                theme={theme}
                target={target}
                total={modifiedTotal}
                variant={{
                    isWithdraw: isWithdraw,
                    originalTotal: total,
                }}
            />
            <NumberInput
                value={amount}
                setValue={setAmount}
                legend={`Amount to ${isWithdraw? "Withdraw":"Add"}`}
                max={max}
            />
            <Button>{isWithdraw? "Confirm Withdrawal":"Confirm Addition"}</Button>
        </form>
    )
}