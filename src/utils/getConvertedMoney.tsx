//types
import type { Currency, CurrencyObj } from "../contexts/CurrencyContext"

export default function getConvertedMoney (
    toConvertAmount: number, 
    originalCurrency: Currency,
    currencyData: CurrencyObj,
    preferredCurrency: string,
) {
    
    if(!currencyData){
        return 0
    }
    
    const originalCurrencyRate = currencyData.rates[originalCurrency]
    const preferredCurrencyRate = currencyData.rates[preferredCurrency as Currency]

    if(!originalCurrencyRate || !preferredCurrencyRate){
        return 0
    }

    const convertedAmount = (toConvertAmount/originalCurrencyRate) * preferredCurrencyRate
    const roundedAmount = Math.round(convertedAmount * 100) / 100

    return roundedAmount

}
