import axios from "axios";
import baseURL from './baseURL';

const axiosAuth = axios.create({
    baseURL: baseURL + '/auth'
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