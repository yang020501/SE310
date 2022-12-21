import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchAllCourses } from './coursesSlice'
import courseApi from '../../api/courseAPI'



export const useCourses = () => useSelector((state) => state.coursesState.courses)

export const useFetchAllCourses = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllCourses())
    }, [])
}

export const useFetchAllStudentsAssigned = (id) => {
    const [result, setResult] = useState([])
    const fetch = async () => {
        const rs = await courseApi.fetchAllStudentsAssigned(id).catch(data => { return data.response })
        if (rs.status < 200 || rs.status >= 300) {
            setResult("false")
            return
        }
        setResult(rs.data)

    }
    useEffect(() => {
        fetch()
    }, [])
    return result
}   
