import axiosClient from "./axiosClient"
import { API_BASE_URL } from '../config/index'
const userApi = {
    fetchUser: (token) => {
        const url = `/api/user/info`
        return axiosClient.get(url)
    },
    getAllUsers: () => {
        const url = "/user/getAll"
        return axiosClient.get(url)
    },
    postUser: (body) => {
        const url = '/user'
        return axiosClient.post(url, { ...body })
    },
    editUser: (id, body) => {
        const url = `/user/${id}`
        return axiosClient.patch(url, { ...body })
    },
    deleteUser: (id) => {
        const url = `/user/${id}`
        return axiosClient.delete(url)
    },
    login: (body) => {
        const url = `/api/auth/login`
        return axiosClient.post(url, {...body})
    },
    register: (body) => {
        const url = '/user/register'
        return axiosClient.post(url, { ...body })
    }
}

export default userApi