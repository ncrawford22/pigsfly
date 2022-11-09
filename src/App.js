import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import TeamPage from "./pages/TeamPage";
import Register from "./pages/Register";
import SmackBoard from "./pages/SmackBoard";

import ownerService from './services/ownerService';

let initialRender = true;

function App() {

    const [owner, setOwner] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const currentOwnerInfo = async () => {
        try {

            const info = await ownerService.info();

            const { teamName, email } = info.data;
            setOwner({ teamName, email })
            
        } catch (error) {
            let message = error.response.data.error;

            if (message.includes('expire')) {
                localStorage.removeItem('token')
            }
            
            console.log(message)

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {

        let token = localStorage.getItem('token');

        if (initialRender) {
            if (token) {
                currentOwnerInfo(token)
                initialRender = false
            } else {
                setIsLoading(false)
            }
        }

    }, [])

    let routes;
    let loggedIn = owner.teamName;

    if (!isLoading) {
        if (loggedIn) {
            routes = (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route 
                        path="/team" 
                        element={
                            <TeamPage 
                                teamName={owner.teamName} 
                                email={owner.email} 
                            />
                        } 
                    /> 
                    <Route path="/smackboard" element={<SmackBoard owner={owner.teamName} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            )
        } else {
            routes = (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setOwner={setOwner} />} />
                    <Route path="/register" element={<Register setOwner={setOwner} />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            )
        }
    }

    return ( 
        <div className="app">
            <Navbar owner={owner.teamName} setOwner={setOwner} />
            {routes}
        </div>
     );
}

export default App;