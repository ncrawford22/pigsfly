import axios from "axios";

const axiosAuth = axios.create({
    baseURL: 'http://localhost:8080/auth'
})

const login = (ownerCredentials) => {

    return axiosAuth.post('/login', ownerCredentials)
}

const register = (ownerCredentials) => {
    return axiosAuth.post('/register', ownerCredentials)
}

const services = {
    login,
    register
}

export default services