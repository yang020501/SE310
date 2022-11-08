import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

const MyButton = props => {
    // const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main'
    // const size = props.size ? 'btn-' + props.size : ''
    // const animate = props.animate ? 'btn-animate' : ''
    return (
        // <button className={`btn ${bg} ${size} ${animate}`}
        //     onClick={props.onclick ? () => props.onclick() : null}>
        //     <span className='btn-txt'>{props.children}</span>
        //     {
        //         props.icon ? (
        //             <span className='btn-icon'>
        //                 <i className={`${props.icon} bx-tada`}></i>
        //             </span>
        //         ) : null
        //     }


        // </button>
        <Button
            type={props.type? props.type : ''}
            fullWidth={props.fullWidth ? true : false}
            size={props.size ? props.size : ''}
            onClick={props.onclick ? () => props.onclick() : null}
            
        >
            {
                props.children
            }
        </Button>
    )
}

Button.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.string,
    // icon: PropTypes.string,
    // animate: PropTypes.bool,
    onclick: PropTypes.func,
    fullWidth: PropTypes.bool
}

export default MyButton