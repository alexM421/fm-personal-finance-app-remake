//types
import type { Currency, CurrencyRates } from "../contexts/CurrencyContext"
import roundNumber2Decimals from "./roundNumber2Decimals"

export default function getChangeRate (
    originalCurrency: Currency,
    preferredCurrency: string,
    currencyData: CurrencyRates
)
{
    
    const originalCurrencyRate = currencyData[originalCurrency]
    const preferredCurrencyRate = currencyData[preferredCurrency as Currency]

    if(!preferredCurrencyRate || !originalCurrencyRate){
        return 1
    }

    const changeRate = preferredCurrencyRate / originalCurrencyRate
    const roundedChangeRate = roundNumber2Decimals(changeRate)

    return roundedChangeRate
}