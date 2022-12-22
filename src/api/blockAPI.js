import axiosClient from "./axiosClient"

const blockApi = {
    updateCourse: (body) => {
        const url = `/api/courses/block`
        return axiosClient.patch(url, { ...body })
    },
    fetchAllBlocks: (id) =>{
        const url = `/api/courses/block/${id}`
        return axiosClient.get(url)
    }
}

export default blockApi