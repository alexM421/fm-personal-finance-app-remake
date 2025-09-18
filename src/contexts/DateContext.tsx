//React
import { createContext, useContext, useEffect, useState } from "react";
//utils
import getCachedData from "../utils/getCachedData";
import { useAuthContext } from "./AuthContext";

export type DateJson = {
  timezone: string,
  datetime: string,
//   date: string,
//   year: number,
//   month: number,
//   day: number,
//   hour: number,
//   minute: number,
//   second: number,
//   day_of_week: string,
}

const getDate = async (): Promise<DateJson> => {
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    try{
        const res = await fetch(`https://api.api-ninjas.com/v1/worldtime?timezone=${clientTimeZone}`,{
            method: "GET",
            headers: {
                "X-Api-Key": import.meta.env.VITE_API_NINJA_KEY 
            }
        })

        if(!res.ok){
            throw new Error("Primary API failed")
        }

        const json = await res.json()
        return {
            timezone: json.timezone,
            datetime: json.datetime
        }

    }catch(err){

        //Backup Api
        const backupRes = await fetch(`https://worldtimeapi.org/api/timezone/${clientTimeZone}`)
        
        if(!backupRes.ok){
            throw new Error("Both APIs failed")
        }

        const json = await backupRes.json()
        return {
            timezone: json.timezone,
            datetime: json.datetime
        }
    }
}



type DateContextValue = {
    date: DateJson | null;
    setDate: React.Dispatch<React.SetStateAction<DateJson | null>>
}

const DateContext = createContext<DateContextValue | undefined>(undefined) 

type DateProviderProps = {
    children: React.ReactNode
}

export function DateProvider ({ children }: DateProviderProps) {

    const session = useAuthContext()
    
    const [date, setDate] = useState<DateJson | null>(null)

    useEffect(() => {
        const getTime = async () => {
            const time = await getCachedData("date", getDate)
            setDate(time)
        } 
        getTime()
    },[session])

    const value = {
        date: date,
        setDate: setDate
    }

    return(
        <DateContext.Provider value={value}>
            { children }
        </DateContext.Provider>
    )
}

export function useDateContext () {

    const context = useContext(DateContext)

    if(!context){
        throw new Error("DataContext is not defined.")
    }

    return context
    
}