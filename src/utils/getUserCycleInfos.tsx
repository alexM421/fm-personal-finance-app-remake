//contexts
import { useDataContext } from "../contexts/DataContext"
import { useDateContext } from "../contexts/DateContext"
import GetEndMonthDay from "./GetEndMonthDay"

export default function getUserCycleInfos () {
    
    const { date } = useDateContext()
    const { data } = useDataContext()

    if(!date){
        return null
    }

    const { year, month, datetime } = date

    const userCycleStartDay =  GetEndMonthDay(data.personnalSettings.budgetCycleDay, month, year)
    const userEndCycleDay = userCycleStartDay===1? GetEndMonthDay(31, month, year) : userCycleStartDay-1

    const currentDateObject = new Date(datetime)
    const possibleCycleStart = new Date(`${year}-${month}-${userCycleStartDay} 00:00:00`)

    if(possibleCycleStart.getTime() <= currentDateObject.getTime()){
        return {
            userCycleStartDate: new Date(`${year}-${month}-${userCycleStartDay} 00:00:00`),
            userCycleEndDate: new Date(`${year}-${month===12? 1: month+1}-${userEndCycleDay} 23:59:59`)
        }
    }else{
        return {
            userCycleStartDate: new Date(`${year}-${month===1? 12: month-1}-${userCycleStartDay} 00:00:00`),
            userCycleEndDate: new Date(`${year}-${month}-${userEndCycleDay} 23:59:59`)
        }
    }
    
}