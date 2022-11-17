import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import ownerService from "../services/ownerService";

function Register({ setOwner }) {

    const navigate = useNavigate()

    let [form, setForm] = useState({ 
        teamName: '',
        password: '',
        email: ''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await authService.register(form)
            localStorage.setItem("token", response.data.token)

            const info = await ownerService.info()
    
            setOwner(info.data)
            navigate('/team')

        } catch (error) {
            console.log(error.response.data.error)
            alert(error.response.data.error)
        }

    }

    return ( 
        <>
            <h1>Register</h1>
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
                <label htmlFor="email">Email:</label>
                <br />
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
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
                <button>Register</button>
            </form>
        </>
     );
}

export default Register;