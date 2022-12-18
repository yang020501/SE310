
import axiosClient from "./axiosClient"

const userApi = {
    fetchUser: () => {        
        const url = `/api/user/info`
        return axiosClient.get(url)      
    },
    fetchAllUsers: () => {        
        const url = `/api/user/get-all`
        return axiosClient.get(url)      
    },
    changePasswordUser: (body) => {
        const url = `/api/user/info/change-password`
        return axiosClient.patch(url, { ...body })
    },
    updateUser: (body) => {
        const url = `/api/user/info/update-info`
        return axiosClient.patch(url, { ...body })
    },
    deleteUser: (id) => {
        const url = `/api/user/users/${id}`
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