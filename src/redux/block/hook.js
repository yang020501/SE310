import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'





export const useBlocks = () => useSelector((state) => state.blocksState.blocks)


export const useFetchAllBlocks = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllCourses())
    }, [])
}

