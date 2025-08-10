//CSS
import styles from "./Infographic.module.css"
//types
import type { Budget, Transaction } from "../../contexts/DataContext"
//utils
import filterTransactionsByCycle from "../../utils/filterTransactionsByCycle"

type InfographicProps = {
    budgets: Budget[],
    transactions: Transaction[]
}

export default function Infographic ({ budgets, transactions }: InfographicProps) {

    const budgetLimit = budgets.reduce((acc, currentBudget) => acc + currentBudget.maximum, 0)

    const currentCycleTransactions = filterTransactionsByCycle(transactions)
    const budgetedTransactions = currentCycleTransactions.filter(transaction => transaction.amount<0)

    const budgetCurrentSpending = Math.round(Math.abs(budgetedTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)))
        

    return(
        <div className={styles.infographic}>
            <div className={styles["infographic-second-layer"]}></div>
            <div className={styles["infographic-content"]}>
                <h1 className="text-preset-1">${budgetCurrentSpending}</h1>
                <p className="text-preset-5">of ${budgetLimit} limit</p>
            </div>
        </div>
    )
}