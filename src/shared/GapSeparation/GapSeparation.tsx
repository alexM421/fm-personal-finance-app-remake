import styles from "./GapSeparation.module.css"

type GapSeparationProps = {
    theme?: string,
}

export default function GapSeparation ({ theme }: GapSeparationProps) {


    return(
        <div 
            className={styles["gap-separation"]}  
            style={{backgroundColor: theme}}    
        ></div>
    )
}