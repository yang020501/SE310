import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Landing = () => {
    const role = useSelector(state => state.userState.user ? state.userState.user.role : "")
    return (
        <React.Fragment>
            {
                role ?
                    role === "admin" ?
                        <Navigate to='/admin' />
                        : role === "mod" ?
                            <Navigate to='/courses' />
                            : <Navigate to='/classes' />
                    : <Navigate to="/login" />
            }
        </React.Fragment>

    )}

export default Landing
