export default function getBillPaidStatus (date: string, dueDate: string, period: string) {

    const dateObj = new Date(date)
    const dueDateObj = new Date(dueDate)
    const prevDueDateObj = new Date(dueDate)
    
    switch(period){
        case "Weekly" : 
            prevDueDateObj.setDate(prevDueDateObj.getDate() - 7)
            break;
        case "Monthly":
            prevDueDateObj.setMonth(prevDueDateObj.getMonth()-1)
            break;
        case "Yearly":
            prevDueDateObj.setFullYear(prevDueDateObj.getFullYear()-1)
            break;
    }

    const threeDays = 1000 * 60 * 60 * 24 * 3
    //isPaid if bill has been paid in the last 3 days
    const isPaid = (dateObj.getTime() - (prevDueDateObj.getTime() + threeDays)) < 0 
    //isDueSoon if bill is going to be paid in the next 3 days
    const isDueSoon = (dueDateObj.getTime() - dateObj.getTime()) < threeDays
    //isNeutral if isDueSoon et isPaid or both false
    const isNeutral = !isPaid && !isDueSoon

    return { isPaid, isDueSoon, isNeutral }
}