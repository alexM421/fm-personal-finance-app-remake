//CSS
import styles from "./Overview.module.css"
//Overview
import OverviewLinkButton from "./OverviewLinkButton"
import OverviewPot from "./OverviewPot"

export default function OverviewPots () {



    return(
        <div className={styles["overview-pots"]}>   
            <div>
                <h2 className="text-preset-2">Pots</h2>
                <OverviewLinkButton link="/pots">See Details</OverviewLinkButton>
            </div>
            <div className={styles["overview-pots-main"]}>
                <div>
                    <img src="/assets/images/icon-pot.svg" alt="Pot icon"/>
                    <div>
                        <p className="text-preset-4">Total Saved</p>
                        <h3 className="text-preset-1">$850</h3>
                    </div>
                </div>
                <div>
                    <OverviewPot
                        colorCode="red"
                        potTitle="Savings"
                        amount={159}    
                    />
                    <OverviewPot
                        colorCode="var(--green)"
                        potTitle="Savings"
                        amount={159}    
                    />
                    <OverviewPot
                        colorCode="var(--green)"
                        potTitle="Savings"
                        amount={159}    
                    />
                    <OverviewPot
                        colorCode="var(--green)"
                        potTitle="Savings"
                        amount={159}    
                    />
                </div>
            </div>
        </div>
    )
}