import getSymbolFromCurrency from "currency-symbol-map"

export default function formatNumber (amount: number, currency: string, showPlus: boolean){

    const formattedNumber = Math.abs(amount).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    const sign = amount>=0 ? "+":"-"
    const symbol = getSymbolFromCurrency(currency) || currency

    return `${sign==="+" && !showPlus ? "":sign}${formattedNumber}${symbol}`
}