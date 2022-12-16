import axiosClient from "./axiosClient"
import { API_BASE_URL } from '../config/index'
const userApi = {
    fetchUser: () => {
        const url = `/api/user/info`
        return axiosClient.get(url)
    },
    changePasswordUser: (body) => {
        const url = `/api/user/info/change-password`
        return axiosClient.patch(url, { ...body })
    },
    postUser: (body) => {
        const url = '/user'
        return axiosClient.post(url, { ...body })
    },
    updateUser: (body) => {
        const url = `/api/user/info/update-info`
        return axiosClient.patch(url, { ...body })
    },
    deleteUser: (id) => {
        const url = `/user/${id}`
        return axiosClient.delete(url)
    },
    login: (body) => {
        const url = `/api/auth/login`
        return axiosClient.post(url, { ...body })
    },
    register: (body) => {
        const url = '/api/auth/register'
        return axiosClient.post(url, { ...body })
    }
}

export default userApi