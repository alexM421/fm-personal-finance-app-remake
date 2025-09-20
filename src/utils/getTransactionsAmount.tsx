import type { Transaction } from "../types/DataTypes"

export default function getTransactionsAmount ( transactions: Transaction[]) {

    return transactions.reduce((acc, transaction) => acc + Math.abs(transaction.amount),0)
}