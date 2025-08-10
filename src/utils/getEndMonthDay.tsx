export default function getEndMonthDay (endMonthDay: number, currentMonth: number, currentYear: number) {

    const monthsWith31Days = [1,3,5,7,8,10,12] 
    const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) 
        || currentYear % 400 === 0;
    if(endMonthDay>31){
        return getEndMonthDay(31, currentMonth, currentYear)
    }else if(endMonthDay===31 && !monthsWith31Days.includes(currentMonth)){
        return getEndMonthDay(endMonthDay-1, currentMonth, currentYear)
    }else if(endMonthDay===30 && currentMonth===2){
        return getEndMonthDay(endMonthDay-1,currentMonth,currentYear)
    }else if(endMonthDay===29 && currentMonth===2 && !isLeapYear){
        return 28
    }else{
        return endMonthDay
    }
}