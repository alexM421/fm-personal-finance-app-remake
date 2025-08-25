//CSS
import { useEffect, useRef, useState, type JSX } from "react"
import styles from "./CustomSelect.module.css"
import IconCaretDown from "../../assets/IconCaretDown"
import Search from "../Search/Search"
import useHandleClickOutside from "../../hooks/useHandleClickOutside"

type CustomSelectProps = {
    selected: string,
    setSelected: (value: string) => void,
    options: string[],
    hasSearch: boolean
    onRender?: (arg: string) => JSX.Element
}

//guard against hasSearch and T not being string types

export default function CustomSelect({ selected, setSelected, options, hasSearch, onRender }: CustomSelectProps) {

    const [search, setSearch] = useState<string>("")

    const selectedRef = useRef<HTMLDivElement>(null)
    const optionsRef = useRef<HTMLDivElement>(null)

    const {isHidden, setIsHidden} = useHandleClickOutside([selectedRef,optionsRef])
    
    const optionsList = hasSearch
        ? options.filter(option => option.includes(search))
        : options

    const handleOptionChange = (e: React.MouseEvent<HTMLParagraphElement>) => {
        const paragraphValue = e.currentTarget.innerText
        setSelected(paragraphValue)
        setIsHidden(true)
    }

    return(
        <div className={`${styles["custom-select"]} ${isHidden && styles.hidden}`}>
            <div 
                className={`${styles["custom-select-selected"]} text-preset-4`}
                ref={selectedRef}
                onClick={() => setIsHidden(prevState => !prevState)}
            >
                {onRender?  onRender(selected): selected}
                <IconCaretDown/>
            </div>
            <div 
                className={styles["custom-select-options"]}
                ref={optionsRef}
            >   
                {
                    hasSearch &&
                    <Search
                        search={search}
                        setSearch={setSearch}
                        placeholder=""
                    />
                }   
                {optionsList.flatMap((option, index) => {

                    const optionElement = <div 
                        className={`text-preset-4 ${styles["option-element"]}`}
                        style={{fontWeight: selected===option? "bold":""}}
                        onClick={handleOptionChange}
                        key={`option-${option}`}
                        >{onRender? onRender(option): option}</div>
                    const optionBorder = <div className={styles["option-border"]} key={`option-border-${option}`}></div>
                    
                    return index+1 === options.length 
                        ? optionElement
                        : [optionElement, optionBorder]
                })}
            </div>
        </div>
    )
}