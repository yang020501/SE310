import axiosClient from "./axiosClient"

const courseApi = {
    createCourse: (body) => {
        const url = `/api/courses/`
        return axiosClient.post(url, { ...body })
    },
    updateCourse: (body) => {
        const url = `/api/courses/`
        return axiosClient.patch(url, { ...body })
    },
    deleteCourse: (id) => {
        const url = `/api/courses/${id}`
        return axiosClient.delete(url)
    },
    fetchAllCourses: () => {
        const url = `/api/courses/get-all`
        return axiosClient.get(url)
    },
    fetchAllAssignedCourses: () => {
        const url = `/api/courses/get-assign-course`
        return axiosClient.get(url)
    },
    fetchAllStudentsAssigned: (id) => {
        const url = `/api/course-user/course-students/${id}`
        return axiosClient.get(url)
    },
    addStudentsForCourse: (body) => {
        const url = `/api/course-user/add-students/`
        return axiosClient.post(url, { ...body })
    },
    removeStudentsForCourse: (body) => {
        const url = `/api/course-user/remove-students/`
        return axiosClient.patch(url, { ...body })
    },
    fetchAvailableCourses: () => {
        const url = `/api/register-course/available-courses`
        return axiosClient.get(url)
    },
    fetchRegisteredCourses: () => {
        const url = `/api/register-course/registed-course`
        return axiosClient.get(url)
    },
    registerToCourse: (body) => {
        const url = `/api/register-course/register`
        return axiosClient.post(url, { ...body })
    },
    cancelRegisteredCourse: (body) => {
        const url = `/api/register-course/cancel-course`
        return axiosClient.post(url, { ...body })
    },
    createCoursesByCSV: (body) => {
        const url = `/api/courses/create-courses-with-csv`
        return axiosClient.post(url, body)
    },
    finalizeCourses: () => {
        const url = `/api/register-course/finalize-courses-registraiton`
        return axiosClient.post(url)
    },
    checkRegistrationCourses: () => {
        const url = `/api/register-course/check-registration-timeline`
        return axiosClient.get(url)
    },
    setRegistrationTimeline : (data) => {
        const url = `/api/register-course/set-registration-timeline`
        return axiosClient.post(url, {...data})
    }

}
export default courseApi