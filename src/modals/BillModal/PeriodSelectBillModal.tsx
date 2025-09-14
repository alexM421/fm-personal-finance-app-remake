//CSS
import CustomSelect from "../../shared/CustomSelect/CustomSelect"
import styles from "./BillModal.module.css"

type PeriodSelectBillModal = {
    selected: string
    setSelected: (value: string, object: {}) => void,
    legend: string,
}

export default function PeriodSelectBillModal ({ selected, setSelected, legend }: PeriodSelectBillModal) {


    const periods = ["Weekly","Monthly","Yearly"]

    return(
        <div className={styles["period-select-bill-modal"]}>
            <p className="text-preset-5-bold">{legend}</p>
            <div>
                <CustomSelect
                    options={periods}
                    selected={selected}
                    setSelected={(e) => setSelected("period", e)}
                    hasSearch={false}
                />
            </div>
        </div>
    )
}