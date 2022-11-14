import { useEffect, useState } from "react"

export default function DisplayFantasyData() {

    let [fantasyDataMain, setFantasyDataMain] = useState([]);
   
    const URL = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons/2022/segments/0/leagues/387714?view=mMatchup&view=mMatchupScore&view=mRoster&view=mScoreboard&view=mSettings&view=mStatus&view=mTeam&view=modular&view=mNav';
    

    const getFantasyDataMain = async () => {
        try {
          const response = await fetch(URL);
          const data = await response.json();
          setFantasyDataMain(data)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
            getFantasyDataMain();
    }, [])

    console.log('this is fantasyDataMain', fantasyDataMain.teams)

    return (
        <div>

        </div> 
    )
}