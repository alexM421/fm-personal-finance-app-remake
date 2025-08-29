//contexts
import { useCurrencyContext, type Currency } from "../contexts/CurrencyContext"
import { useDataContext } from "../contexts/DataContext"
import getConvertedMoney from "../utils/getConvertedMoney"

export default function useGetConvertedMoney () {

    const currencyData = useCurrencyContext()
    const { data: { personnalSettings: { preferredCurrency } } } = useDataContext()

    return (toConvertAmount: number, originalCurrency: Currency) => {
        
        if(!currencyData){
            return 0
        }


        return getConvertedMoney(
            toConvertAmount, 
            originalCurrency,
            currencyData,
            preferredCurrency
        )
    }
}