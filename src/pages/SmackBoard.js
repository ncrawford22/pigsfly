import { useEffect, useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert";

import messageService from '../services/messageService';

export default function SmackBoard( { owner }) {

    let messagesRef = useRef();

    const [messages, setMessages] = useState([]);

    const getAllMessages = async () => {

        try {
            const response = await messageService.index();

            setMessages(response.data.messages);

        } catch (error) {
            alert(error.response.data.error)
        }
    }

    useEffect(() => {
            getAllMessages()
            
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        let newMessage = {
            messages: messagesRef.current.value,
            owner
        }
        try {
            const response = await messageService.createMessage(newMessage)

            console.log(response)
            setMessages([...messages, response.data.message])
            messagesRef.current.value = "";

        } catch (error) {
            alert(error.response.data.error)
        }
        
    }

    const deleteMessages = async (e) => {
        e.preventDefault();

        try {
            const response = await messageService.deleteMessages(messages)
            console.log(response)
            setMessages([])

        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteMessages = () => {
        confirmAlert({
            title: 'Confirm Smack Board Deletion',
            message: 'Are you sure you want to delete this smack talk masterpiece?! You will not be able to recover them...',
            buttons: [
                {
                    label: "No, Cancel now!"
                },
                {
                    label: "Yes, I sure do!",
                    onClick: () => 
                        deleteMessages()
                }
            ]
        })
    }
    
    console.log(messages)
    return (
        <div>
            <h1>Smack Board</h1>

            <ol style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px'}}>
                {messages.map(m =>
                
                    <div className="smboard-container">
                        <ul className="smboard-msg" key={m._id}>
                            <div className="smack-message">
                                {m.messages}
                            </div>
                            <div className="smack-message-owner">
                                {m.owner}
                            </div>    
                        </ul>
                    </div>
                )}
            </ol>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="messages">Talk Some Smack: </label>
                    <br />
                    <input 
                        type="text" 
                        ref={messagesRef}
                    /> <br /><br />
                    <button type="submit">Smack Talk</button>
                </form>
                <br />
                <div className="delete-btn">
                {owner === "Let Me See Your TDs" && <button onClick={handleDeleteMessages}>Delete Messages</button>}
                </div>
        </div>
    )
}