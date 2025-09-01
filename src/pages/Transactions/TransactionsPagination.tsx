//CSS
import styles from "./Transactions.module.css"
//assets
import IconCaretRight from "../../assets/IconCaretRight"
//types
import type { Transaction } from "../../types/DataTypes"

type TransactionsPaginationProps = {
    filteredData: Transaction[],
    selectedPage: number,
    setSelectedPage: (num:number | ((prevNum :number) => number )) => void,
    perPage: number,
}

export default function TransactionsPagination ({ filteredData ,selectedPage, setSelectedPage, perPage}: TransactionsPaginationProps) {

    const pagesNumber = Math.ceil(filteredData.length/perPage) || 1
    
    const handlePaginationDisplay = () => {

        return(
            <div className={styles["pagination-items"]}>
                <div className={`${styles["pagination-item"]} ${selectedPage===1 && styles["pagination-current-item"]}`} onClick={() => setSelectedPage(1)}>
                    <p className="text-preset-4">1</p>
                </div>
                {
                    selectedPage-2>1
                    && <div className={`${styles["pagination-item"]} ${styles["pagination-dot-dot-dot"]}`}>
                        <p className="text-preset-4">...</p>
                    </div>
                }
                {
                    selectedPage-1>1
                    && <div className={styles["pagination-item"]} onClick={() => setSelectedPage(prevpage => prevpage-1)}>
                        <p className="text-preset-4">{selectedPage-1}</p>
                    </div>
                }
                {
                    selectedPage!==1 
                    && selectedPage !==pagesNumber 
                    && <div className={`${styles["pagination-item"]} ${styles["pagination-current-item"]}`}>
                        <p className="text-preset-4">{selectedPage}</p>
                    </div>
                }
                {
                    selectedPage+1<pagesNumber  
                    && <div className={styles["pagination-item"]} onClick={() => setSelectedPage(prevpage => prevpage+1)}>
                        <p className="text-preset-4">{selectedPage+1}</p>
                    </div>
                }
                {
                    selectedPage+2<pagesNumber  
                    && <div className={`${styles["pagination-item"]} ${styles["pagination-dot-dot-dot"]}`}>
                       <p className="text-preset-4">...</p>
                    </div>
                }
                {
                    pagesNumber!==1
                    &&<div className={`${styles["pagination-item"]} ${selectedPage===pagesNumber && styles["pagination-current-item"]}`} onClick={() => setSelectedPage(pagesNumber)}>
                        <p className="text-preset-4">{pagesNumber}</p>            
                    </div>
                }
            </div>
        )
    }



    return(
        <div className={styles.pagination}>
            <div className={`${styles.previous} ${selectedPage===1? styles.disabled:""}`} onClick={() => setSelectedPage(prevpage => prevpage-1)}>
                <IconCaretRight/>
                <p className="text-preset-4">Prev</p>
            </div>
            {handlePaginationDisplay()}
            <div className={`${styles.next} ${selectedPage===pagesNumber? styles.disabled:""}`} onClick={() => setSelectedPage(prevpage => prevpage+1)}>
                <p className="text-preset-4">Next</p>
                <IconCaretRight/>
            </div>
        </div>
    )
}