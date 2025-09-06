export default function getDueDate(prevDueDate: string,period: string){

    const prevDate = new Date(prevDueDate)

    switch (period) {
        case "Weekly":
            prevDate.setDate(prevDate.getDate()+7)
            break;
        case "Monthly":
            prevDate.setMonth(prevDate.getMonth()+1)
            break;
        case "Yearly":
            prevDate.setFullYear(prevDate.getFullYear()+1)
            break;
    }


    return prevDate.toISOString()
}
//does not work since month are not the same