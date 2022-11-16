import axios from "axios";
import baseURL from './baseURL';

const getToken = () => {
    let token = localStorage.getItem("token");

    return token ? token : ""
}

const axiosMessages = () => axios.create({
    baseURL: baseURL + '/smackboard',
    headers: {
        'Authorization': `Bearer ${getToken()}`
    }
})

const index = () => {

    return axiosMessages().get('/index')
}

const createMessage = (newMessage) => {

    return axiosMessages().post('/newmessage', newMessage)
}

const deleteMessages = (messages) => {
    return axiosMessages().delete('/clear', messages)
}


const services = {
    index,
    createMessage,
    deleteMessages
}

export default services