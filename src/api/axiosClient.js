import axios from 'axios'
import { API_BASE_URL } from '../config/index'

let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ""

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})

export default axiosClient