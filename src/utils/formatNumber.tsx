import getSymbolFromCurrency from "currency-symbol-map"

export default function formatNumber (amount: number, currency: string){

    const formattedNumber = Math.abs(amount).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    const sign = amount>=0 ? "+":"-"
    const symbol = getSymbolFromCurrency(currency)

    return `${sign}${formattedNumber}${symbol}`
}