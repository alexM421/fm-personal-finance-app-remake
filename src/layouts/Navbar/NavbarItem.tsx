//CSS
import { Link } from "react-router"
import styles from "./Navbar.module.css"

type NavbarItemProps = {
    svgElement: React.ReactElement,
    title: string,
    link: string,
    isActive: boolean,
}

export default function NavbarItem ({ svgElement, title, link, isActive }: NavbarItemProps) {



    return(
        <Link className={`${styles["navbar-item"]} ${isActive && styles["active-navbar-item"]}`} to={link}>
            {svgElement}
            <p className="text-preset-3">{title}</p>
        </Link>
    )
}