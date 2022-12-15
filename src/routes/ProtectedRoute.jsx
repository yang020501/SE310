import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import NavbarHeader from '../components/NavbarHeader'

const ProtectedRoute = () => {
    const userState = useSelector(state => state.userState)
    return (
        userState.user ?
            <React.Fragment>
                <div className='container'>
                    <NavbarHeader />
                    <div className="content">
                        <div className="content-body">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </React.Fragment>
            :
            <Navigate to='/login' />
    )
}

export default ProtectedRoute