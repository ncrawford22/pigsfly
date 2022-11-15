export default function DisplayFantasyData({ team, fantasyDataMain, teamName, email}) {
    return (
        <div>
            <h1 style={{paddingBottom: '10px'}}>{teamName}</h1>
            {fantasyDataMain && 
                <div className="profile-logo" style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={team.logo} alt="profile-logo"></img>
                </div>}
                <br />
            <p style={{fontWeight: 'bolder'}}>Team Name: <span style={{fontWeight: 'normal'}}>{teamName}</span></p>
            <p>Email: {email}</p>
            <div className="record">Record: {team.record.overall.wins}-{team.record.overall.losses}-{team.record.overall.ties}</div>
            {team.record.overall.streakType === "WIN" && <div className="winStreak">Winning Streak: {team.record.overall.streakLength} Wins</div>}
            {team.record.overall.streakType === "LOSS" && <div className="loseStreak">Losing Streak: {team.record.overall.streakLength} Losses</div>}
            <div className="playoffSeed">Current Projected Playoff Seed: #{team.playoffSeed}</div>
            <br />
            <div className="roster">
                <h5 style={{textDecoration: 'underline'}}>Current Roster</h5>
                {team.roster.entries.map((entry, i) => <div key={i}>{entry.playerPoolEntry.player.fullName}</div>)}
            </div>
        </div> 
    )
}