import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUser } from './userSlice'
import { fetchAllLecturers, fetchAllUsers } from './allUsersSlice'


export const useUserState = () => useSelector((state) => state.userState)
export const useUserStateValue = () => useSelector((state) => state.userState.value)
export const useAllUsersState = () => useSelector((state) => state.allUsersState.users)
export const useAllLecturers = () => useSelector((state) => state.allUsersState.lecturers)

export const useFetchAllUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [])

}
export const useFetchAllLecturers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllLecturers())
    }, [])

}

export const useFetchUser = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

}