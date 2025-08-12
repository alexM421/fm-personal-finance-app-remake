//CSS
import styles from "./Search.module.css"
//react
import type { ChangeEvent, Dispatch, SetStateAction } from "react"
//assets
import IconSearch from "../../assets/IconSearch"

type SearchProps = {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
    placeholder: string,
}

export default function Search ({ search, setSearch, placeholder }:SearchProps) {

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return(
        <label className={styles.search}>
            <input 
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder={placeholder}
            />
            <IconSearch/>
        </label>
    )
}