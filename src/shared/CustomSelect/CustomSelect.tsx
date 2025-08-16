//CSS
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import styles from "./CustomSelect.module.css"
import IconCaretDown from "../../assets/IconCaretDown"

type CustomSelectProps = {
    selected: string,
    setSelected: (string: string) => void,
    options: string[]
}

export default function CustomSelect ({ selected, setSelected, options}: CustomSelectProps) {

    const [isHidden, setIsHidden] = useState<boolean>(true)

    const selectedRef = useRef<HTMLDivElement | null>(null)
    const optionsRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {

        const handleClickOutside = (e: MouseEvent) => {

            const isOutsideSelectedRef = !selectedRef.current?.contains(e.target as Node)
            const isOutsideOptionsRef = !optionsRef.current?.contains(e.target as Node)

            if(isOutsideSelectedRef && isOutsideOptionsRef){
                setIsHidden(true)
            }
        }

        window.addEventListener("mousedown", handleClickOutside)

        return () => window.removeEventListener("mousedown", handleClickOutside)
    }
    ,[])

    const handleOptionChange = (e: React.MouseEvent<HTMLParagraphElement>) => {
        const paragraphValue = e.currentTarget.innerText
        setSelected(paragraphValue)
        setIsHidden(true)
    }

    return(
        <div className={`${styles["custom-select"]} ${isHidden && styles.hidden}`}>
            <div 
                className={styles["custom-select-selected"]}
                ref={selectedRef}
                onClick={() => setIsHidden(prevState => !prevState)}
            >
                <p className="text-preset-4">{selected}</p>
                <IconCaretDown/>
            </div>
            <div 
                className={styles["custom-select-options"]}
                ref={optionsRef}
            >
                {options.flatMap((option, index) => {

                    const optionElement = <p 
                        className="text-preset-4"
                        style={{fontWeight: selected===option? "bold":""}}
                        onClick={handleOptionChange}
                        key={`option-${option}`}
                        >{option}</p>
                    const optionBorder = <div className={styles["option-border"]} key={`option-border-${option}`}></div>
                    
                    return index+1 === options.length 
                        ? optionElement
                        : [optionElement, optionBorder]
                })}
            </div>
        </div>
    )
}