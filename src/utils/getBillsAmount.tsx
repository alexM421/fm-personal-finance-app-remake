import type { Bill } from "../types/DataTypes"
import type { CurrencyRates, Currency } from "../contexts/CurrencyContext"

export default function getBillsAmount (bills: Bill[], rates: CurrencyRates | null) {
    const total = bills.reduce((acc, bill) => {
        if(rates){
            return bill.amount*rates[bill.currency as Currency] + acc
        }else{
            return bill.amount + acc
        }
    },0)

    return total
}