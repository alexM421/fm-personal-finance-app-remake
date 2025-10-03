//react
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
//supabase
import { supabase } from "../supabaseClient";
import type { Session } from "@supabase/supabase-js";


type AuthContextValue = {
    auth: Session | null,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type AuthContextProviderProps = {
    children: ReactNode
}

export function AuthProvider ({ children }: AuthContextProviderProps){

    const [auth, setAuth] = useState<Session | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getLoggedIn = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setAuth(session || null)
            if(session){
                setLoading(false)
            }
        }
        getLoggedIn()

        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            setAuth(session ?? null)
            setLoading(false)
        })

        setTimeout(() => {
            setLoading(false)
        },300)

        return () => data.subscription.unsubscribe()
        
    },[])

    const value={
        auth: auth,
        loading: loading,
        setLoading: setLoading,
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}


export function useAuthContext () {

    const context = useContext(AuthContext)

    if(context === undefined){
        throw new Error("AuthContext is not defined")
    }

    return context
}

