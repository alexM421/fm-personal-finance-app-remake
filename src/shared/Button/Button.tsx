//CSS
import styles from "./Button.module.css"

type ButtonProps = {
    children: string,
    onClick?: ((e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
}   

export default function Button ({ children, onClick }: ButtonProps) {

    

    return(
        <button 
            className={`text-preset-4-bold ${styles.button}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}