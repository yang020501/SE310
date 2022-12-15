import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUser } from './userSlice'


export const useUserState = () => useSelector((state) => state.userState)


export const useFetchUser = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

}