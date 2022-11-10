import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import MyButton from './MyButton'
import MyBreadcrums from './MyBreadcrums'
import ReorderIcon from '@mui/icons-material/Reorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom'

const NavbarHeader = props => {
    const menuRef = useRef(null);
    const iconRef = useRef(null);
    const menuToggle = () => {
        menuRef.current.classList.toggle('active')
        iconRef.current.classList.toggle('active')
    }
    return (
        <div className='navbarheader'>
            <div className="navbarheader-navbar">
                <div className="navbarheader-navbar-icon" onClick={menuToggle} ref={iconRef} >
                    <ReorderIcon />
                </div>
                <div className="navbarheader-navbar-bread">
                    <MyBreadcrums />

                </div>
            </div>
            <div className="navbarheader-sidemenu" ref={menuRef}>
                <div className="navbarheader-sidemenu-header">
                    <div className="navbarheader-sidemenu-header-item bold">
                        <Avatar alt="Avatar" src={require('../asset/pictures/avatar.jpg')} />
                        Nguyen Hoang Thai Duong
                    </div>
                    <div className="navbarheader-sidemenu-header-item">
                        <Link>
                            <SettingsIcon style={{ width: "24px" }} />
                            Profile Settings
                        </Link>

                    </div>
                    <div className="navbarheader-sidemenu-header-item" >
                        <Link to={"/login"}>
                            <LogoutIcon />
                            Log Out
                        </Link>
                    </div>
                </div>
                <div className="divider">

                </div>
                <div className="navbarheader-sidemenu-body">
                    <div className="navbarheader-sidemenu-body-item">
                        <Link to={"/"}>
                            Dashboard
                        </Link>
                    </div>
                    <div className="navbarheader-sidemenu-body-item">
                        <Link to={"/login"}>
                            Courses
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

NavbarHeader.propTypes = {

}

export default NavbarHeader