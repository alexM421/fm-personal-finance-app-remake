//react
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
//supabase
import { supabase } from "../supabaseClient";
import type { Session } from "@supabase/supabase-js";


type AuthContextValue = Session | null

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type AuthContextProviderProps = {
    children: ReactNode
}

export function AuthProvider ({ children }: AuthContextProviderProps){

    const [auth, setAuth] = useState<Session | null>(null)

    useEffect(() => {
        const getLoggedIn = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setAuth(session || null)
        }
        getLoggedIn()
    },[])

    return (
        <AuthContext.Provider value={auth}>
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

