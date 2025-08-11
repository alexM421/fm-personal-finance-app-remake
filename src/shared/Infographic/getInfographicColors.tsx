import type { BudgetAmount } from "../../contexts/ComputedDataContext";

export default function getInfographicColors ( budgetCurrentSpending: number, budgetsAmount: BudgetAmount[]) {

    let colorStopPercent = 0

    const colorsArr = budgetsAmount.map((budgetAmount,index) => {

        const colorCode = budgetAmount.theme
        const budgetPercent = Math.floor(Math.abs(budgetAmount.amount / budgetCurrentSpending) * 100)
        const colorStart = `${colorStopPercent}%`
        const colorStop = index+1=== budgetsAmount.length 
                ? "100%"
                :`${colorStopPercent + budgetPercent}%` 
        colorStopPercent += budgetPercent
        
        return `${colorCode} ${colorStart} ${colorStop}`
    })

    const colorsString = colorsArr.join(",")
    
    const backgroundStyle = `conic-gradient(${colorsString})`    

    return backgroundStyle
}