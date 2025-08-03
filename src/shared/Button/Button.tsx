//CSS
import styles from "./Button.module.css"

type ButtonProps = {
    children: string,
}

export default function Button ({ children }: ButtonProps) {

    return(
        <button className={`text-preset-4-bold ${styles.button}`}>
            {children}
        </button>
    )
}