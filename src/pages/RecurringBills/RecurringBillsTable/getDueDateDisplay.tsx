export default function getDueDateDisplay (dueDateObj: Date, period: string) {

    const daysArr =  ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
    const monthsArr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    switch(period){
        case "Weekly":
            return `Weekly-${daysArr[dueDateObj.getDay()-1]}`
        case "Monthly":
            return `Monthly-${dueDateObj.getDate()}`
        case "Yearly": 
            return `Monthly-${monthsArr[dueDateObj.getMonth()-1]}-${dueDateObj.getDate()}`
        default:
            return undefined
    }
}