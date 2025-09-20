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
                ?<img src={`/assets/images/icons/icon-${content}.svg`} alt="avatar icon"/>
                :<p className="text-preset-3">{content.slice(0,2).toUpperCase()}</p>    
            }
        </div>
    )
}