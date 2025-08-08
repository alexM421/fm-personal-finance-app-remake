//CSS
import styles from "./Overview.module.css"
//assets
import IconCaretRight from "../../assets/IconCaretRight"
//React
import { Link } from "react-router"

type OverviewLinkButtonProps = {
    children: string,
    link: string,
}

export default function OverviewLinkButton ({ children, link }: OverviewLinkButtonProps) {


    return(
        <Link to={link} className={styles["overview-link-btn"]}>
            <p className="text-preset-4">{children}</p>
            <IconCaretRight/>
        </Link>
    )
}