//CSS
import styles from "./Budgets.module.css"
//overview
import OverviewTransaction from "../Overview/OverviewTransaction"
//utils
import sortedTransactionsByDate from "../../utils/SortedTransactionsByDate"
//contexts
import { useComputedDataContext } from "../../contexts/ComputedDataContext"
import GapSeparation from "../../shared/GapSeparation/GapSeparation"
import { useDataContext } from "../../contexts/DataContext"
import OverviewLinkButton from "../Overview/OverviewLinkButton"

type BudgetItemLatestProps = {
    category: string,
}

export default function BudgetItemLatest ({ category }: BudgetItemLatestProps) {

    const { computedData: { budgetedTransactions} } = useComputedDataContext()
    const { data: { personnalSettings: { preferredCurrency }} } = useDataContext()

    const filteredBudgetedTransactions = budgetedTransactions.filter(transaction => transaction.category === category)
    const sortedFilteredBudgetedTransactions = sortedTransactionsByDate(filteredBudgetedTransactions)
    const latestTransactions = sortedFilteredBudgetedTransactions.slice(0,3)

    const budgetItemTransactionsDisplay = latestTransactions.flatMap((transaction,index) => {

        const {avatar, name, amount, date, rate, id} = transaction

        const convertedAmount = rate * amount

        return(
            index===2

                ?<OverviewTransaction
                    avatar={avatar}
                    name={name}
                    amount={convertedAmount}
                    date={date}
                    currency={preferredCurrency}
                    key={`budget-latest-transaction-${id}`}
                /> 

                :[
                    <OverviewTransaction
                        avatar={avatar}
                        name={name}
                        amount={convertedAmount}
                        date={date}
                        currency={preferredCurrency}
                        key={`budget-latest-transaction-${id}`}
                    />,
                    <GapSeparation
                        key={`budget-latest-transaction-gap-${id}`}
                        theme="#6968680E"
                    />
                ]
        )
    })

    return(
        <div className={styles["budget-item-latest"]}>
            <div className={styles["budget-item-latest-header"]}>
                <p className="text-preset-3">Latest Spending</p>
                <OverviewLinkButton link={"/transactions"}>See All</OverviewLinkButton>
            </div>
            <div className={styles["budget-item-latest-transactions"]}>
                {budgetItemTransactionsDisplay}
            </div>
        </div>
    )
}