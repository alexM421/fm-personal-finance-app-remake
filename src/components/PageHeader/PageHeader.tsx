//CSS
import styles from "./PageHeader.module.css"
//shared
import Button from "../../shared/Button/Button"
import type { Dispatch, SetStateAction } from "react"

type PageHeaderProps = {
    pageTitle: string,
    btnTxt: string,
    toggleState: Dispatch<SetStateAction<boolean>>
}

export default function PageHeader ({ pageTitle, btnTxt, toggleState }:PageHeaderProps) {


    return (
        <div className={styles["page-header"]}>
            <h1 className="text-preset-1">{pageTitle}</h1>
            <Button onClick={() => toggleState(prevState => !prevState)}>{btnTxt}</Button>
        </div>
    )
}