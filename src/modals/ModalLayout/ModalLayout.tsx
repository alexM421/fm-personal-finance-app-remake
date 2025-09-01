//CSS
import styles from "./ModalLayout.module.css"
//assets
import IconCloseModal from "../../assets/IconCloseModal"
import { useRef, type ReactNode } from "react"
import { createPortal } from "react-dom"
import useHandleClickOutside from "../../hooks/useHandleClickOutside"

type ModalLayoutProps = {
    modalTitle: string,
    modalDesc: string,
    modalDisplay: boolean,
    closeModalDisplay: () => void,
    children: ReactNode,
}

export default function ModalLayout ({ modalTitle, modalDesc, modalDisplay, closeModalDisplay, children }: ModalLayoutProps) {

    const modalRef = useRef<HTMLDivElement | null>(null)
    
    useHandleClickOutside([modalRef], closeModalDisplay)

    return(
        modalDisplay
        && createPortal(
            <div className={styles["modal-layout"]}>
                <div className={styles["actual-modal"]} ref={modalRef}>
                    <div className={styles["modal-header"]}>
                        <h1 className="text-preset-1">{modalTitle}</h1>
                        <button onClick={closeModalDisplay}>
                            <IconCloseModal/>
                        </button>
                    </div>
                    <p className="text-preset-4">{modalDesc}</p>
                    {children}
                </div>
            </div>
            ,document.body
        )
    )
}