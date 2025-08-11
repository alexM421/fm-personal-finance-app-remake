//CSS
import styles from "./PageHeader.module.css"
//shared
import Button from "../../shared/Button/Button"

type PageHeaderProps = {
    pageTitle: string,
    btnTxt: string,
}

export default function PageHeader ({ pageTitle, btnTxt }:PageHeaderProps) {


    return (
        <div className={styles["page-header"]}>
            <h1 className="text-preset-1">{pageTitle}</h1>
            <Button>{btnTxt}</Button>
        </div>
    )
}