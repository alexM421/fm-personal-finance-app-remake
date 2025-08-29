//types
import type { Currency, CurrencyObj, CurrencyRates } from "../contexts/CurrencyContext"

export default function getConvertedMoney (
    toConvertAmount: number, 
    originalCurrency: Currency,
    currencyData: CurrencyRates,
    preferredCurrency: string,
) {
    
    const originalCurrencyRate = currencyData[originalCurrency]
    const preferredCurrencyRate = currencyData[preferredCurrency as Currency]

    if(!originalCurrencyRate || !preferredCurrencyRate){
        return 0
    }

    const convertedAmount = (toConvertAmount/originalCurrencyRate) * preferredCurrencyRate
    const roundedAmount = Math.round(convertedAmount * 100) / 100

    return roundedAmount

}
