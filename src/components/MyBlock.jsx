import React from 'react'
import PropTypes from 'prop-types'

const MyBlock = props => {
    const block = props.padding ? props.padding : ''
    return (
        <div className='block' style={{ padding: `${block}` }}>
            {
                props.children
            }
        </div>
    )
}

MyBlock.propTypes = {
    padding: PropTypes.string
}

export default MyBlock