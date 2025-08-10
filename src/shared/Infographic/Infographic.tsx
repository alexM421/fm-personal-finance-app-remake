//CSS
import filterTransactionsByCycle from "../../utils/FilterTransactionsByCycle"
import styles from "./Infographic.module.css"

type InfographicProps = {
    budgets: {
        category: string,
        maximum: number,
        theme: string
    }[],
    transactions: {
            avatar: string,
            name: string,
            category: string,
            date: string,
            amount: number,
            recurring: boolean,
    }[]
    
}

export default function Infographic ({ budgets, transactions }: InfographicProps) {

    const budgetLimit = budgets.reduce((acc, currentBudget) => acc + currentBudget.maximum, 0)

    const currentCycleTransactions = filterTransactionsByCycle(transactions)
    

    const budgetCurrentSpending = currentCycleTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)
        

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