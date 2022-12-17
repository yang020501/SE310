import axiosClient from "./axiosClient"

const courseApi = {
    createCourse: (body) => {
        const url = `/api/courses/create`
        return axiosClient.post(url,{...body})
    },
    updateCourse: (body) => {
        const url = `/api/courses/update`
        return axiosClient.patch(url,{...body})
    },

}

export default courseApi