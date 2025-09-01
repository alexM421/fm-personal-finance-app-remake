//CustomSelect
import CustomSelectWrapper from "./CustomSelectWrapper";

type CategoriesSelectProps = {
    selected: string,
    setSelected: (e: string) => void,
    legend: string, 
    disabledOptions ?: string[],
    error?: boolean
}

export default function CategoriesSelect ({ selected, setSelected, legend, disabledOptions, error }: CategoriesSelectProps) {

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
            disabledOptions={disabledOptions}
            error={error}
        />
    )
}