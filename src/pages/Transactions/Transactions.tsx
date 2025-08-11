//CSS
import PageHeader from "../../components/PageHeader/PageHeader"
import styles from "./Transactions.module.css"

export default function Transactions () {


    return(
        <div className={styles.transactions}>
            <PageHeader
                pageTitle="Transactions"
                btnTxt="+ Add New Transaction"
            />
        </div>
    )
}