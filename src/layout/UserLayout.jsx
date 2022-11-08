import React from 'react'
import { Outlet } from "react-router-dom";
import NavbarHeader from '../components/NavbarHeader';

const UserLayout = () => {
    return (
        <React.Fragment>
            <NavbarHeader />
            <div className="content">
                <Outlet />
            </div>
            
        </React.Fragment>
    )
}

export default UserLayout