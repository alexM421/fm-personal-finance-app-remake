//CSS
import type { JSX } from "react"
import styles from "./Button.module.css"

type ButtonProps = {
    children: string | JSX.Element
    onClick?: ((e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void),
    variant?: string
}   

export default function Button ({ children, onClick, variant="" }: ButtonProps) {

    

    return(
        <button 
            className={`text-preset-4-bold ${styles.button} ${styles[variant]}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}