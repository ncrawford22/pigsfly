import { useEffect, useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";

import messageService from '../services/messageService';
import { Container, Button } from "react-bootstrap";

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

    const deleteMessages = async () => {
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
        <div className="smackboard-main">
            <h1>Smack Board</h1>
            <Container className="smackboard-container">
                <Card style={{borderRadius: '45px', boxShadow: '4px 4px 4px 2px grey'}}>
                    <Card.Body>
                        <ol style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px'}}>
                            {messages.map(m =>
                            
                                <div className="smboard-container">
                                    <ul className="smboard-msg" key={m._id}>
                                        <div className="smack-message">
                                            {m.messages}
                                        </div>
                                        <div className="smack-message-owner">
                                             - {m.owner}
                                        </div>    
                                    </ul>
                                </div>
                            )}
                        </ol>
                    </Card.Body>
            </Card>
            </Container>
            <Container style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                <Form onSubmit={handleSubmit} style={{display: 'flex', justifyContent: 'center', alightItems: 'center', flexDirection: 'column', width: '500px'}}>
                        <Form.Label htmlFor="messages" style={{paddingTop: '15px'}}>Talk Some Smack: </Form.Label>
                        <Form.Control as="textarea" rows={3} 
                            ref={messagesRef}
                        /> <br /><br />
                        <Button variant="primary" type="submit">Smack Talk</Button>
                </Form>
            </Container>                
                <br />
                <div className="delete-btn">
                {owner === "Let Me See Your TDs" && <Button variant="secondary" onClick={handleDeleteMessages}>Delete Messages</Button>}
                </div>
                <br />
        </div>
    )
}