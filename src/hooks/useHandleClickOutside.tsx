//types & react
import { useEffect, useState, type RefObject } from "react"

export default function useHandleClickOutside (
    refsArr: RefObject<HTMLElement | null>[]
    ) {
        const [isHidden, setIsHidden] = useState<boolean>(true)

        useEffect(() => {    
                const handleClickOutside = (e: MouseEvent) => {
        
                    const isOutsideRefsArr = refsArr.map(ref => !ref.current?.contains(e.target as Node))

                    if(isOutsideRefsArr.every(Boolean)){
                        setIsHidden(true)
                    }
                }
        
                window.addEventListener("mousedown", handleClickOutside)
        
                return () => window.removeEventListener("mousedown", handleClickOutside)
            }
        ,[])

        return {isHidden: isHidden, setIsHidden: setIsHidden}
}