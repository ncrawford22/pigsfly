import { useState } from "react"

export default function EditTeamInfo({ email, isLoading }) {

        console.log(email)
    let [newEmail, setNewEmail] = useState({ 
        email: email
    })

    let [editActive, setEditActive] = useState(true)

    const handleChange = (e) => {
        setNewEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setEditActive(false)
    }

    return ( 
        <div className="edit-form">
            {!isLoading && editActive && <form onSubmit={handleSubmit}>
                <label htmlFor="email">Update Email:</label>
                <br />
                <input 
                    id="email"
                    type="text" 
                    value={newEmail.email} 
                    onChange={handleChange} 
                />
                <input type="submit" value="Edit" />
            </form>}
        </div>
    )
}