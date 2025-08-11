//contexts
import getEndMonthDay from "./getEndMonthDay"

export default function getUserCycleInfos (year: number, month: number, datetime: string, budgetCycleDay: number) {

    const userCycleStartDay =  getEndMonthDay(budgetCycleDay, month, year)
    const userEndCycleDay = userCycleStartDay===1? getEndMonthDay(31, month, year) : userCycleStartDay-1

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