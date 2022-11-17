import { useEffect, useState } from "react";
import DisplayFantasyData from "../components/DisplayFantasyData";
import EditTeamInfo from "../components/EditTeamInfo";

function TeamPage({ teamName, email, setOwner }) {
    
    let [fantasyDataMain, setFantasyDataMain] = useState([]);
    let [team, setTeam] = useState({});
    let [isLoading, setIsLoading] = useState(true);

    const URL = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons/2022/segments/0/leagues/387714?view=mMatchup&view=mMatchupScore&view=mRoster&view=mScoreboard&view=mSettings&view=mStatus&view=mTeam&view=modular&view=mNav';

useEffect(() => {
    const getFantasyDataMain = async () => {
        try {
          setIsLoading(true) 
          const response = await fetch(URL);
          const data = await response.json();
          console.log('Check here for full data', data)
          setFantasyDataMain(data)

          const removeExtraSpace = (s) => s.trim().split(/ +/).join(' ');
          const teams = data.teams.find( team =>
            
            removeExtraSpace(team.name) === teamName)
            setTeam(teams)
            setIsLoading(false)
        } catch (error) {
            alert(error)
            setIsLoading(false)
        }
    }
    getFantasyDataMain();
}, [teamName])

console.log(team)
    return ( 
        <div className="team-page" style={{overflow: 'hidden'}}>
            {isLoading && <h1>Loading Fantasy data....</h1>}
            {!isLoading && <DisplayFantasyData team={team} teamName={teamName} isLoading={isLoading} fantasyDataMain={fantasyDataMain} email={email} />}
            {!isLoading && <EditTeamInfo email={email} isLoading={isLoading} setOwner={setOwner} />}
        </div>
        
     );
}

export default TeamPage;

