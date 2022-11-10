import axios from "axios";

const getToken = () => {
    let token = localStorage.getItem("token")

    return token ? token : ""
}

const axiosOwner = () => axios.create({
    baseURL: 'http://localhost:8080/owners',
    headers: {
        'Authorization': `Bearer ${getToken()}`
    }
})


const info = () => {

    return axiosOwner().get('/info')
}

const deleteOwners = (owners) => {
    return axiosOwner().delete('/clear', owners)
}


const services = {
    info,
    deleteOwners
}

export default services