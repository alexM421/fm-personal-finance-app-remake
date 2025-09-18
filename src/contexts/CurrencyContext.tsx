import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { supabase } from "../supabaseClient";

export type Currency = `${Uppercase<string>}${Uppercase<string>} ${Uppercase<string>}`

export type CurrencyObj = {
    base: string,
    disclaimer: string,
    license: string,
    rates: Record<Currency, number>
    timestamp: number,
}

export type CurrencyRates = Record<Currency, number>

const fetchCurrencyData = async ():Promise<CurrencyObj> => {
    const appId = import.meta.env.VITE_API_OPEN_EXCHANGE_ID
    const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}`)
    const json = await res.json()
    return json
}


type CurrencyContextValue = CurrencyRates | null

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined)

type CurrencyProviderProps = {
    children: React.ReactNode
}

export function CurrencyProvider ({ children }: CurrencyProviderProps) {

    const session = useAuthContext().auth

    const [currencyData, setCurrencyData] = useState<CurrencyContextValue>(null)

    useEffect(() => {
        const getCurrencyData = async () => {
            const date = new Date().toISOString().split("T")[0]
            const { data, error } = await supabase.from("ratesdata").select("rates").eq("rates_date", date)

            if(!data || data.length === 0){
                const todayRates = await fetchCurrencyData()
                const { error } = await supabase.from("ratesdata").insert({"rates_date": date, "rates": todayRates.rates})
                getCurrencyData()

            }else{
                setCurrencyData(data[0].rates)

            }
        }

        if(session){
            getCurrencyData()
        }

    },[session])

    return(
        <CurrencyContext.Provider value={currencyData}>
            { children }
        </CurrencyContext.Provider>
    )
}

export function useCurrencyContext () {

    const context = useContext(CurrencyContext)

    if(context === undefined){
        throw new Error("context is undefined")
    }

    return context
}