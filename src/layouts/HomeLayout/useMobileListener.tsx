//react
import { useEffect, useState } from "react"

export default function useMobileListener () {
    
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth
            setIsMobile(windowWidth <= 1000)
        }
        handleResize()
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    },[])

    return { isMobile }
}