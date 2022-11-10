import React from 'react'
import PropTypes from 'prop-types'
import AddCircleIcon from '@mui/icons-material/AddCircle';
const DataGridAdd = props => {
    return (
        <div className="gridadd" onClick={props.click ? props.click : null}>
            <AddCircleIcon />
        </div>

    )
}

DataGridAdd.propTypes = {
    click: PropTypes.func
}

export default DataGridAdd