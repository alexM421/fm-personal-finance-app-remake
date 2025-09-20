//CSS
import styles from "./ColorBar.module.css"

type ColorBarProps = {
    theme: string,
    height: string
}

export default function ColorBar ({ theme, height }: ColorBarProps) {


    return(
        <div 
            className={styles["color-bar"]}
            style={{
                backgroundColor: theme,
                height: height
            }}
        >
        </div>
    )
}