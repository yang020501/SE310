import axiosClient from "./axiosClient"

const courseApi = {
    createCourse: (body) => {
        const url = `/api/courses/create`
        return axiosClient.post(url, { ...body })
    },
    updateCourse: (body) => {
        const url = `/api/courses/update`
        return axiosClient.patch(url, { ...body })
    },
    fetchAllCourses: () => {
        const url = `/api/courses/get-all`
        return axiosClient.get(url)
    },
    fetchAllAssignCourses: () => {
        const url = `/api/courses/get-assign-course`
        return axiosClient.get(url)
    },
    delteCourse: (id) => {
        const url = `/api/courses/${id}`
        return axiosClient.delete(url)
    }
}
export default courseApi