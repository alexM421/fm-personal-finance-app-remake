//CSS
import Avatar from "../../shared/Avatar/Avatar"
import type { AvatarType } from "../../types/DataTypes"
import formatNumber from "../../utils/formatNumber"
import styles from "./Overview.module.css"

type OverviewTransactionsProps = {
    avatar: AvatarType
    name: string,
    amount: number,
    date: string,
    currency: string,
}

export default function OverviewTransaction ({ avatar, name, amount, date, currency}: OverviewTransactionsProps) {

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit", 
        month: "short",  
        year: "numeric"  
    }).format(new Date(date))

    return(
        <div className={styles["overview-transaction"]}>
            <div className={styles["overview-transaction-profile"]}>
                <Avatar
                    theme={avatar.theme}
                    content={avatar.content}
                    isContentImage={avatar.isContentImage}
                />
                <h3 className="text-preset-4-bold">{name}</h3>
            </div>
            <div className={styles["overview-transaction-infos"]}>
                <h3 
                    className="text-preset-4-bold" 
                    style={
                        {color: amount<0
                            ?"var(--grey-900)"
                            :"var(--green)"
                        }
                    }>{formatNumber(amount, currency, true)}</h3>
                <p className="text-preset-5">{formattedDate}</p>
            </div>
        </div>
    )
}