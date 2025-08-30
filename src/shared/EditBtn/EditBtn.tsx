//CSS
import styles from "./EditBtn.module.css"
//react
import { useRef } from "react"
//shared
import GapSeparation from "../GapSeparation/GapSeparation"
//hooks
import useHandleClickOutside from "../../hooks/useHandleClickOutside"


type EditBtnProps = {
    displayEdit: () => void,
    displayDelete: () => void
}

export default function EditBtn ({ displayEdit, displayDelete }: EditBtnProps) {

    const contextMenuRef = useRef(null)
    const ellipsisBtnRef = useRef(null)
    
    const { isHidden, setIsHidden } = useHandleClickOutside([contextMenuRef, ellipsisBtnRef])

    return(
        <div className={styles["edit-btn"]}>
            <button 
                onClick={() => setIsHidden(prevValue => !prevValue)}
                ref={ellipsisBtnRef}    
            >
                    <img src="/assets/images/icon-ellipsis.svg"/>
            </button>
            <div 
                ref={contextMenuRef}
                className={`
                    ${styles["edit-btn-context-menu"]} 
                    ${isHidden? styles["edit-btn-context-menu-hidden"]:""}
                `}
            >
                <button 
                    className="text-preset-4"
                    onClick={displayEdit}
                >Edit</button>
                <GapSeparation/>
                <button 
                    className="text-preset-4"
                    onClick={displayDelete}
                >Delete</button>
            </div>
        </div>
    )
}