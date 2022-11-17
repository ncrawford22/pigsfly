export default function Home() {
    return (
        <div className="home">
            <h1 className="home-h1" style={{paddingBottom: '2px'}}>Pigsfly Fantasy Football</h1>
            <a href="https://fantasy.espn.com/football/league?leagueId=387714" target="_blank" rel="noreferrer"><img className="logo"alt="logo" src="./logo-512.png"></img></a>
            <div className="home-h2-outerBorder"></div>
            <div className="home-h2-border">
                <h2 className="home-h2">"Where Fantasy Sports Meets Reality?"</h2>
            </div>
        </div>
    )
}