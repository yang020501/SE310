import React from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add';
const LineAction = props => {
    return (
        <div className='lineaction' onClick={props.click ? props.click : null}>
            <div className="lineaction-icon">
                <AddIcon />
            </div>
            <div className="lineaction-actionname">
                {props.name}
            </div>
        </div>
    )
}

LineAction.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string
}

export default LineAction