//CSS
import styles from "./CustomSelect.module.css"
//CustomSelect
import CustomSelectWrapper from "./CustomSelectWrapper";

type CategoriesSelectProps = {
    selected: string,
    setSelected: (e: string) => void,
    legend: string, 
}

export default function CategoriesSelect ({ selected, setSelected, legend }: CategoriesSelectProps) {

    const categories = [
        "Entertainment",
        "Bills",
        "Groceries",
        "Dining Out",
        "Transportation",
        "Personal Care",
        "Education",
        "Lifestyle",
        "Shopping",
        "General"
    ]

    return(
        <CustomSelectWrapper
            options={categories}
            selected={selected}
            setSelected={setSelected}
            legend={legend}
        />
    )
}