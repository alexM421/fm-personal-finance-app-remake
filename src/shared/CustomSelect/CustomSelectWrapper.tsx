//CSS
import styles from "./CustomSelect.module.css"
//CustomSelect
import CustomSelect from "./CustomSelect"
import type { JSX } from "react"

type CategoriesCustomSelectProps = {
    options: string[],
    selected: string,
    setSelected: (e: string) => void,
    legend: string, 
    onRender?: (arg: string, selected: string, isSelect: boolean) => JSX.Element,
    disabledOptions?: string[],
    error?: boolean,
    hasSearch?: boolean
}

export default function CustomSelectWrapper({ options, selected, setSelected, legend, onRender, disabledOptions, error, hasSearch }: CategoriesCustomSelectProps) {

    return(
        <div 
            className={`${styles["custom-select-wrapper"]} ${error? styles["custom-select-wrapper-err"]:""}`}
        >
            <p className="text-preset-5-bold">{legend}</p>
            <CustomSelect
                selected={selected}
                setSelected={setSelected}
                options={options}
                hasSearch={hasSearch??false}
                onRender={onRender}
                disabledOptions={disabledOptions}
                error={error}
            />
        </div>
    )
}