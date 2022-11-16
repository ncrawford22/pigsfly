import { useState } from "react"

export default function GetFantasyData() {

    let [fantasyData, setFantasyData] = useState([]);
    let [form, setForm] = useState({
        league_id: '',
        year: ''
    })
    const URL = `https://fantasy.espn.com/apis/v3/games/ffl/seasons/${form.year}/segments/0/leagues/${form.league_id}?view=modular&view=mNav&view=mMatchupScore&view=mScoreboard&view=mSettings&view=mTopPerformers&view=mTeam`;

    const getFantasyData = async () => {
        try {
          const response = await fetch(URL);
          const data = await response.json();
          setFantasyData(data)
          console.log(data)
        } catch (error) {
            alert(error)
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getFantasyData(form)
        console.log(fantasyData)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="leagueId">Enter League ID: </label>
                <br />
                <input 
                    type="text"
                    id="league_id"
                    name="league_id"
                    value={form.league_id}
                    onChange={handleChange}
                />
                <br /><br />
                <label htmlFor="year">Year: </label>
                <br />
                <input 
                    type="text"
                    id="year"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                />
                <br /><br />
                <button>Submit</button>
            </form>
        </div>
    )
}