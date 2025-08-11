//React
import { createContext, useContext, useEffect, useState } from "react";

export type DateJson = {
  timezone: string,
  datetime: string,
  date: string,
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  day_of_week: string,
}


const getDate = async () => {
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const res = await fetch(`https://api.api-ninjas.com/v1/worldtime?timezone=${clientTimeZone}`,{
        method: "GET",
        headers: {
            "X-Api-Key": import.meta.env.VITE_API_NINJA_KEY 
        }
    })
    const json = await res.json()
    return json
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

    const [date, setDate] = useState<DateJson | null>(null)

    useEffect(() => {
        getDate().then(json => setDate(json))
    },[])

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