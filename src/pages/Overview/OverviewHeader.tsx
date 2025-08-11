//CSS
import styles from "./Overview.module.css"
//overview
import OverviewLinkButton from "./OverviewLinkButton"

type OverviewHeaderProps = {
    title: string,
    link: string,
    btnDesc: string,
}

export default function OverviewHeader ({ title, link, btnDesc}: OverviewHeaderProps) {


    return(
        <div className={styles["overview-header"]}>
            <h2 className="text-preset-2">{title}</h2>
            <OverviewLinkButton link={link}>{btnDesc}</OverviewLinkButton>
        </div>
    )
}