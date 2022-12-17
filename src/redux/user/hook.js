import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUser } from './userSlice'
import { fetchAllUsers } from './allUsersSlice'


export const useUserState = () => useSelector((state) => state.userState)
export const useUserStateValue = () => useSelector((state) => state.userState.value)
export const useAllUsersState = () => useSelector((state) => state.allUsersState.users)

export const useFetchAllUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [])

}

export const useFetchUser = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

}