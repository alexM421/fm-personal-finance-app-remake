//CSS
import styles from "./Overview.module.css"
//Overview
import OverviewHeader from "./OverviewHeader"
import OverviewColorPotBudget from "./OverviewColorPotBudget.tsx"
//utils
import getSymbolFromCurrency from "currency-symbol-map"
//contexts
import { useDataContext } from "../../contexts/DataContext.tsx"

export default function OverviewPots () {

    const { data } = useDataContext()
    const { pots } = data
    const { personnalSettings: { preferredCurrency}} = data


    const totalSaved = pots.reduce((acc, pot) =>  acc + pot.total ,0)

    return(
        <div className={styles["overview-pots"]}>   
            <OverviewHeader
                title="Pots"
                link="/pots"
                btnDesc="See Details"
            />
            <div className={styles["overview-pots-main"]}>
                <div>
                    <img src="/assets/images/icon-pot.svg" alt="Pot icon"/>
                    <div>
                        <p className="text-preset-4">Total Saved</p>
                        <h3 className="text-preset-1">{`${Math.round(totalSaved)}${getSymbolFromCurrency(preferredCurrency)}`}</h3>
                    </div>
                </div>
                <div>
                    {pots.slice(0,4).map(pot => 
                        <OverviewColorPotBudget
                            colorCode={pot.theme}
                            title={pot.name}
                            amount={pot.total}
                            key={`pot-${pot.name}`}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}