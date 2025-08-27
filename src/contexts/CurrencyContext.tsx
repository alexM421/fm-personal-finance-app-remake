import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useDataContext } from "./DataContext";
import getCachedData from "../utils/getCachedData";

export type Currency = `${Uppercase<string>}${Uppercase<string>} ${Uppercase<string>}`

export type CurrencyObj = {
    base: string,
    disclaimer: string,
    license: string,
    rates: Record<Currency, number>
    timestamp: number,
}

const fetchCurrencyData = async ():Promise<CurrencyObj> => {
    const appId = import.meta.env.VITE_API_OPEN_EXCHANGE_ID
    const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}`)
    const json = await res.json()
    return json
}

type CurrencyContextValue = CurrencyObj | null

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined)

type CurrencyProviderProps = {
    children: React.ReactNode
}

export function CurrencyProvider ({ children }: CurrencyProviderProps) {

    const session = useAuthContext().auth
    // const { loading } = useDataContext()

    const [currencyData, setCurrencyData] = useState<CurrencyContextValue>(null)
    
    useEffect(() => {
        const getCurrencyData = async () => {
            // if(!loading){
                const cachedData = await getCachedData<CurrencyObj>("currency_data",fetchCurrencyData)
                setCurrencyData(cachedData)
            // }
        }
        getCurrencyData()
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