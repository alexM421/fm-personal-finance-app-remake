import type { Transaction } from "../../contexts/DataContext";

export default function getFilteredTransactions (transactions: Transaction[], category: string, search: string) {

    const transactionsMatch = transactions.filter(transaction => transaction.name.match(search))

    if(category.toLowerCase()==="all transactions"){
        return transactionsMatch
    }else{
        const filteredTransactions = transactionsMatch.filter((transaction) => transaction.category=== category)
        return filteredTransactions
    }
    
} 