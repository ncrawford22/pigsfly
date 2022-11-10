import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import ownerService from "../services/ownerService";
import 'react-confirm-alert/src/react-confirm-alert.css';
import GetFantasyData from '../components/GetFantasyData';

export default function LeagueAdminCtrls({ owner }) {

    let [owners, setOwners] = useState([]);

    const getAllOwners = async () => {

        try {
            const response = await ownerService.info();

            setOwners(response.data.owners);

        } catch (error) {
            alert(error.response.data.error)
        }
    }

    useEffect(() => {
            getAllOwners()
    }, [])

    const deleteOwners = async () => {
        try {
            const response = await ownerService.deleteOwners(owners);
            console.log(response)
            setOwners([])
            alert('All Owners Have Been Deleted!');

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        confirmAlert({
            title: 'Confirm Owner Deletion',
            message: 'Are you sure you want to delete ALL Owners?! You will not be able to recover them...',
            buttons: [
                {
                    label: "No, Cancel now!"
                },
                {
                    label: "Yes, I sure do!",
                    onClick: () => 
                        deleteOwners()
                }
            ]
        })
    }
    return (
        <>

            <h1>League Admin Controls</h1>
            <div className="admin-delete">
                <h3>Delete All Owners</h3>
                    <br />
                <button onClick={handleSubmit}>Delete Owners</button>
            </div>
            <br />
            <div className="getApi">
                <h3>Get API Data</h3>
                    <br />
                <GetFantasyData />
            </div>
        </>
    )
}