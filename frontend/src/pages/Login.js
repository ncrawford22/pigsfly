import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import ownerService from "../services/ownerService";


function Login({ setOwner }) {

    const navigate = useNavigate()

    let [form, setForm] = useState({ 
        email: '',
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
        <div>
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <br />
                    <input 
                        type="text" 
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
                    <button>Login</button>
                </form>
            </div>

        </div>
     );
}

export default Login;