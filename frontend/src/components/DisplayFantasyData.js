export default function DisplayFantasyData({ team, fantasyDataMain, teamName, email}) {
    return (
        <div className="fantasy-data" style={{marginLeft: '50px'}}>
            <h1 style={{paddingTop: '10px', paddingBottom: '10px'}}>{teamName}</h1>
            {fantasyDataMain && 
                <div className="profile-logo" style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={team.logo} alt="profile-logo" style={{width: "100px", height: "100px"}}></img>
                </div>}
                <br />
            <div className="team-info">
                <div style={{fontWeight: 'bolder'}}>Team Name: <span style={{fontWeight: 'normal'}}>{teamName}</span></div>
                <div>Email: <span style={{fontWeight: 'normal'}}>{email}</span></div>
                <div className="record">Record: <span style={{fontWeight: 'normal'}}>{team.record.overall.wins}-{team.record.overall.losses}-{team.record.overall.ties}</span></div>
                {team.record.overall.streakType === "WIN" && <div className="winStreak">Winning Streak: <span style={{fontWeight: 'normal'}}>{team.record.overall.streakLength} Wins</span></div>}
                {team.record.overall.streakType === "LOSS" && <div className="loseStreak">Losing Streak: <span style={{fontWeight: 'normal'}}>{team.record.overall.streakLength} Losses</span></div>}
                <div className="playoffSeed">Current Projected Playoff Seed: <span style={{fontWeight: 'normal'}}>#{team.playoffSeed}</span></div>
            </div>   
            <br />
            <div className="roster" style={{fontWeight: 'bolder',display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(0,0,255,0.5)', backgroundSize: 'cover', width: '15%', boxShadow: '-5px -5px 25px 5px whitesmoke, 5px 5px 25px 5px blue'}}>
                <h5 style={{textDecoration: 'underline'}}>Current Roster</h5>
                {team.roster.entries.map((entry, i) => <div key={i}>{entry.playerPoolEntry.player.fullName}</div>)}
            </div>
        </div> 
    )
}