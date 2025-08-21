//CSS
import { useState, type Dispatch, type SetStateAction } from "react"
import styles from "./AddTransactionModal.module.css"
import IconCloseModal from "../../assets/IconCloseModal"
import { type AvatarType } from "../../contexts/DataContext"
import Avatar from "../../shared/Avatar/Avatar"

type AddTransactionModalPicturePopUpProps = {
    display: boolean,
    toggleDisplay: Dispatch<SetStateAction<boolean>>,
    avatar: AvatarType,
    setAvatar: (e: Partial<AvatarType>) => void,
    name: string,
}

export default function AddTransactionmodalPicturePopUp ({ toggleDisplay, display, avatar, setAvatar, name }: AddTransactionModalPicturePopUpProps) {
    
    const [selectedHeader, setSelectedHeader] = useState("icon")

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

    const icons = [
        "text",
        "atom",
        "bolt",
        "bot",
        "boxes",
        "brush",
        "cake",
        "calculator",
        "car",
        "chef",
        "dumbbell",
        "drill",
        "flower",
        "gamepad",
        "gem",
        "handshake",
        "leaf",
        "medical",
        "orbit",
        "party",
        "phone",
        "piggy",
        "pizza",
        "plane",
        "plug",
        "rabbit",
        "school",
        "send",
        "shopping",
        "store",
        "terminal",
    ]

    return(
        <div className={`${styles["choose-picture"]} ${!display? styles["choose-picture-hidden"]:""}`}>
            <div className={styles["choose-picture-header"]}>
                <div className={styles["choose-picture-header-selectors"]}>
                    <p 
                        className={
                            `text-preset-4-bold 
                            ${selectedHeader==="icon"
                                ?styles["choose-picture-header-selected"]
                                :""
                            }`
                        }
                        onClick={() => setSelectedHeader("icon")}    
                    >Icon</p>
                    <p 
                        className={
                            `text-preset-4-bold 
                            ${selectedHeader==="theme"
                                ?styles["choose-picture-header-selected"]
                                :""
                            }`
                        }
                        onClick={() => setSelectedHeader("theme")}    
                    >Theme</p>
                </div>
                <button onClick={() => toggleDisplay(false)} type="button">
                    <IconCloseModal/>
                </button>
            </div>
            <div className={styles["choose-picture-main"]}>
                {selectedHeader==="icon"
                    ?icons.map(icon => {

                        const contentOrText = icon==="text"? name:icon
                        const contentImageOrText = icon==="text"? false:true

                        return(
                            <button 
                                type="button"
                                onClick={() => setAvatar({content: contentOrText, isContentImage: contentImageOrText})}
                            >
                                <Avatar 
                                    theme={avatar.theme}
                                    content={contentOrText} 
                                    isContentImage={contentImageOrText}
                                    key={`avatar-icon-picture-${icon}`}
                                />
                            </button>
                        )
                    })
                    :themes.map(theme => 
                        <button 
                            type="button" 
                            onClick={() => setAvatar({theme: theme})}
                        >
                            <Avatar 
                                theme={theme} 
                                content={avatar.content}
                                isContentImage={avatar.isContentImage}
                                key={`avatar-theme-picture-${theme}`}
                            />
                        </button>
                    )
                }
            </div>
        </div>
    )
}