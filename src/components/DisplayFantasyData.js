import { useEffect, useState } from "react"

export default function DisplayFantasyData() {

    let [fantasyData2, setFantasyData2] = useState([]);
   
    const URL = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons/2022/segments/0/leagues/387714?view=mMatchup&view=mMatchupScore&view=mRoster&view=mScoreboard&view=mSettings&view=mStatus&view=mTeam&view=modular&view=mNav';
    

    const getFantasyData2 = async () => {
        try {
          const response = await fetch(URL);
          const data = await response.json();
          setFantasyData2(data)
        } catch (error) {
            alert(error)
        }
    }
    console.log(fantasyData2)


    useEffect(() => {
            getFantasyData2();
    }, [])

    return (
        <div>
            
        </div>
    )
}