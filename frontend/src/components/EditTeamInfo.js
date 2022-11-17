import { useState } from "react"
import { useNavigate } from "react-router-dom";
import ownerService from "../services/ownerService";

export default function EditTeamInfo({ email, isLoading, setOwner }) {

    const navigate = useNavigate();
    
    let [currentEmail, setCurrentEmail] = useState(email)
    let [newEmail, setNewEmail] = useState('')

    // let [newEmail, setNewEmail] = useState('')

    // let [editActive, setEditActive] = useState(true)
    // console.log('this is the email', currentEmail)

    const handleChange = (e) => {

        setNewEmail(e.target.value)
        setCurrentEmail(newEmail)
    }
    // const updateCurrentEmail = () => {
    //     let newEmail = {email}
    //     console.warn("Email: ", newEmail)
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setCurrentEmail(newEmail)
        console.log('this is the new email', newEmail)

        try {
            const response = await ownerService.updateOwnerEmail(newEmail)
            const info = await ownerService.info()
            setOwner(info.data)
            console.log('this is info', info.data)
            navigate("/team")

            console.log(response)
          } catch (error) {
            console.log(error)
          }
        //   setEditActive(false)
        }

    return ( 
        <div className="edit-form">
            {!isLoading && 
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Update Email:</label>
                <br />
                <input 
                    id="email"
                    type="email"
                    name="email" 
                    value={currentEmail} 
                    onChange={handleChange} 
                />
                <input type="submit" value="Edit" />
            </form>}
        </div>
    )
}