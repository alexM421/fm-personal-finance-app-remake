//CSS
import { useRef } from "react"
import styles from "./EditBtn.module.css"
import useHandleClickOutside from "../../hooks/useHandleClickOutside"
import GapSeparation from "../GapSeparation/GapSeparation"


export default function EditBtn () {

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
                <button className="text-preset-4">Edit</button>
                <GapSeparation/>
                <button className="text-preset-4">Delete</button>
            </div>
        </div>
    )
}