import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useDataContext } from "./DataContext";
import getCachedData from "../utils/getCachedData";


const fetchCurrencyData = async (base: string) => {
    const appId = import.meta.env.VITE_API_OPEN_EXCHANGE_ID
    console.log(appId)
    const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}`)
    const json = await res.json()
    return json
}

type CurrencyContextValue = 
    {
        currencyData: string 
    } 
    | null

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined)

type CurrencyProviderProps = {
    children: React.ReactNode
}

export function CurrencyProvider ({ children }: CurrencyProviderProps) {

    const session = useAuthContext().auth
    const { data, loading } = useDataContext()

    const [currencyData, setCurrencyData] = useState<CurrencyContextValue>(null)
    
    const base = data.personnalSettings.preferredCurrency
    
    useEffect(() => {
        const getCurrencyData = async () => {
            if(!loading){
                const cachedData = await getCachedData("currency_data",() => fetchCurrencyData(base))
                console.log(cachedData)
                setCurrencyData[cachedData]
            }
        }
        getCurrencyData()
    },[session])

    return(
        <CurrencyContext.Provider value={currencyData}>
            { children }
        </CurrencyContext.Provider>
    )
}