import type { Transaction } from "../contexts/DataContext";

export default function getTransactionsAmount ( transactions: Transaction[]) {

    return transactions.reduce((acc, transaction) => acc + Math.abs(transaction.amount),0)
}