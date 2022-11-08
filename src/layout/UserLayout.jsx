import React from 'react'
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    )
}

export default UserLayout