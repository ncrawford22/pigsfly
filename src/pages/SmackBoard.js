import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import messageService from '../services/messageService';

export default function SmackBoard( { owner }) {

    console.log(owner)

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

    const navigate = useNavigate();

    const deleteMessages = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`http://localhost:8080/smackboard/clear`, {
                method: "DELETE",
            })
            console.log(response)
            navigate('/smackboard')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Smack Board</h1>

            <ol style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px'}}>
                {messages.map(m => 
                        <li key={m._id}>{m.messages}</li>
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
                {owner === "Let Me See Your TDs" && <button onClick={deleteMessages}>Delete Messages</button>}
                </div>
        </div>
    )
}