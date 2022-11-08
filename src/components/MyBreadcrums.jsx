import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumbs, Link } from '@mui/material/'
const MyBreadcrums = props => {
    return (
        <Breadcrumbs >
            <Link href='/admin' underline='none'>Admin</Link>
            <Link href='/admin/accounts' underline='none'>Account</Link>
        </Breadcrumbs>
    )
}

MyBreadcrums.propTypes = {}

export default MyBreadcrums