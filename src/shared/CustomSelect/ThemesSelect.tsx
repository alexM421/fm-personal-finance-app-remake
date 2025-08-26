//CSS
import styles from "./CustomSelect.module.css"
//CustomSelect
import CustomSelectWrapper from "./CustomSelectWrapper";

type ThemesSelectProps = {
    selected: string,
    setSelected: (e: string) => void,
    legend: string, 
}

export default function ThemesSelect ({ selected, setSelected, legend }: ThemesSelectProps) {

    const themes = [
        "var(--green)",
        "var(--yellow)",
        "var(--cyan)",
        "var(--navy)",
        "var(--red)",
        "var(--purple)",
        "var(--purple-light)",
        "var(--turquoise)",
        "var(--brown)",
        "var(--magenta)",
        "var(--blue)",
        "var(--navy-grey)",
        "var(--army-green)",
        "var(--gold)",
        "var(--orange)"
    ]

    const onRender = (option: string, selected: string, isSelect: boolean ) => {

        const regex = /var\([\-]+/
        const theme = option.replace(regex, "").replace(")", "").replace("-"," ")
        const themeCapitalized = theme[0].toUpperCase() + theme.slice(1)

        const isCurrenctlySelected = selected===option && !isSelect

        return(
            <div className={styles["theme-option"]}>
                <div className={styles["theme-option-content"]}>
                    <div className={styles["theme-pin"]} style={{backgroundColor: option }}></div>
                    <p className="text-preset-4">{themeCapitalized}</p>
                </div>
                {isCurrenctlySelected && <img src="/assets/images/icon-selected.svg"/>}
            </div>
        )
    }

    return(
        <CustomSelectWrapper
            options={themes}
            selected={selected}
            setSelected={setSelected}
            legend={legend}
            onRender={onRender}
        />
    )
}