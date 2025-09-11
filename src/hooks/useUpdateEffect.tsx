import { useEffect, useRef } from "react";

export default function useUpdateEffect (effect: () => void, dependencies: any[]) {

    const isFirstRenderRef = useRef(true)

    useEffect(() => {
        if(isFirstRenderRef.current){
            isFirstRenderRef.current = false
            return
        }
        return effect()
    },[...dependencies])
}