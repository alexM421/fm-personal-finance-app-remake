//react
import { useEffect, useState } from "react"

export default function useMobileListener (width: number) {
    
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth
            setIsMobile(windowWidth <= width)
        }
        handleResize()
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    },[])

    return { isMobile }
}