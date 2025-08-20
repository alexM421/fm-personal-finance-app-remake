import styles from "./Avatar.module.css"

type AvatarProps = {
    theme: string,
    content: string,
    isContentImage: boolean,
}   

export default function Avatar ({ theme, content, isContentImage }:AvatarProps) {


    return(
        <div className={styles.avatar} style={{backgroundColor: theme}}>
            {isContentImage
                ?<img src={content} alt="avatar icon"/>
                :<p>{content}</p>    
            }
        </div>
    )
}