import React from 'react'
import PropTypes from 'prop-types'
import MyDataGrid from './MyDataGrid'
import variable from '../utils/variable'
import { useEffect } from 'react'
import { useState } from 'react'

const CourseCreateResult = props => {
    const columns = variable(['Course Code', 'Course Name', 'Begin Date', 'End Date', 'Date Of Week'])
    const [rows, setRows] = useState(['dasdsadsads'])
    const parseDay = (value) => {
        let tmp = Number(value)
        let day = ""
        switch (tmp) {
            case 0: day = 'Monday'; break;
            case 1: day = 'Tuesday'; break;
            case 2: day = 'Wednesday'; break;
            case 3: day = 'Thursday'; break;
            case 4: day = 'Friday'; break;
            case 5: day = "Saturday"; break;
            case 6: day = 'Sunday'; break;
            default: day = ""; break;
        }
        return day
    }
    useEffect(() => {
        if (props.data.length > 0) {
            let tmp = [...props.data];
            tmp = tmp.map((item) => {
                return {
                    ...item,
                    dateOfWeek: parseDay(item.dateOfWeek),

                }
            })
            setRows(tmp);
        }
        
    }, [props.data])
    return (
        <MyDataGrid

            Data={rows}
            ColumnHeader={columns}

        />
    )
}

CourseCreateResult.propTypes = {
    data: PropTypes.array.isRequired
}

export default CourseCreateResult
