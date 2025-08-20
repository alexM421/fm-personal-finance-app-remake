//CSS
import styles from "./choosePicturaModal.module.css"
//react
import { createPortal } from "react-dom"

type ChoosePictureModalProps = {
    state: boolean,
}

export default function ChoosePicturaModal ({ state }: ChoosePictureModalProps) {


    return(
        state 
        && createPortal(
            <div className={styles["choose-picture-modal"]}>
                <div className={styles["choose-picture-header"]}>
                    <p>Icon</p>
                    <p>Theme</p>
                </div>
                <div className={styles["choose-picture-main"]}>
                    <p>Test</p>
                </div>
            </div>
        ,document.body)
    )
}