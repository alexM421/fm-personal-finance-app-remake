//types & react
import { useEffect, useState, type RefObject } from "react"

type ReturnHidden = {
  isHidden: boolean
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
}

// Overload signatures
export default function useHandleClickOutside(
  refsArr: RefObject<HTMLElement | null>[],
  closeDisplay: () => void
): void

export default function useHandleClickOutside(
  refsArr: RefObject<HTMLElement | null>[]
): ReturnHidden


export default function useHandleClickOutside (
    refsArr: RefObject<HTMLElement | null>[],
    closeDisplay?: () => void 
    ): ReturnHidden | void {
        const [isHidden, setIsHidden] = useState<boolean>(true)

        useEffect(() => {    
                const handleClickOutside = (e: MouseEvent) => {
        
                    const isOutsideRefsArr = refsArr.map(ref => !ref.current?.contains(e.target as Node))

                    if(isOutsideRefsArr.every(Boolean)){
                        if(closeDisplay) closeDisplay()
                        else setIsHidden(true)
                        
                    }
                }
        
                window.addEventListener("mousedown", handleClickOutside)
        
                return () => window.removeEventListener("mousedown", handleClickOutside)
            }
        ,[refsArr, closeDisplay])

        return closeDisplay ? undefined :{isHidden: isHidden, setIsHidden: setIsHidden}
}