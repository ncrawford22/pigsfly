import DisplayFantasyData from "../components/DisplayFantasyData";

function TeamPage({ teamName, email }) {
    return ( 
        <div className="team-page">
            <h1>{teamName}</h1>
            <p>Team Name: {teamName}</p>
            <p>Email: {email}</p>
            <DisplayFantasyData teamName={teamName} />
        </div>
        
     );
}

export default TeamPage;

