//CSS
import styles from "./ModalLayout.module.css"
//assets
import IconCloseModal from "../../assets/IconCloseModal"
import { useEffect, useRef, type Dispatch, type ReactNode, type SetStateAction } from "react"
import { createPortal } from "react-dom"

type ModalLayoutProps = {
    modalTitle: string,
    modalDesc: string,
    state: boolean,
    toggleState: Dispatch<SetStateAction<boolean>>,
    children: ReactNode,
}

export default function ModalLayout ({ modalTitle, modalDesc, state, toggleState, children }: ModalLayoutProps) {

    const modalRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {

        const handleClickOutside = (e: MouseEvent) => {
            const isOutsideModalRef = !modalRef.current?.contains(e.target as Node)
            if(isOutsideModalRef){
                toggleState(false)
            }
        }   

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)

    },[])

    return(
        state
        && createPortal(
            <div className={styles["modal-layout"]}>
                <div className={styles["actual-modal"]} ref={modalRef}>
                    <div className={styles["modal-header"]}>
                        <h1 className="text-preset-1">{modalTitle}</h1>
                        <button onClick={() => toggleState(false)}>
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