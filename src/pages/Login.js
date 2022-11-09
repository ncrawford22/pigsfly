import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import ownerService from "../services/ownerService";

function Login({ setOwner }) {

    const navigate = useNavigate()

    let [form, setForm] = useState({ 
        teamName: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await authService.login(form);
            console.log(response)
            localStorage.setItem("token", response.data.token)

            const info = await ownerService.info();
    
            setOwner(info.data)
            navigate('/team')

        } catch (error) {
            console.log(error)
            console.log(error.response.data.error)
            alert(error.response.data.error)
        }
    }

    return ( 
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="teamName">Team Name:</label>
                <br />
                <input 
                    type="text" 
                    id="teamName"
                    name="teamName"
                    onChange={handleChange}
                    value={form.teamName}
                />
                <br /><br />
                <label htmlFor="password">Password:</label>
                <br />
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                />
                <br /><br />
                <button>Submit</button>
            </form>
        </>
     );
}

export default Login;