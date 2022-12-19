import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchAllCourses } from './coursesSlice'



export const useCourses = () => useSelector((state) => state.coursesState.courses)

export const useFetchAllCourses = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllCourses())
    }, [])

}
