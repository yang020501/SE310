import React from 'react'
import PropTypes from 'prop-types'
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { TableCell } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { parseToLocalDate } from '../utils/parseDate';
const Timetable = props => {
    const [morningRows, setMorningRows] = useState([])
    const [afternoonRows, setAfternoonRows] = useState([])

    const row = [2, 3, 4, 5, 6, 7, 0]
    useEffect(() => {
        if (props.data.length > 0) {
            let morning = props.data.filter(item => item.session)
            let afternoon = props.data.filter(item => !item.session)

            setMorningRows([...morning])
            setAfternoonRows([...afternoon])
        }
    }, [props.data])
    console.log(morningRows);
    return (
        <div className='timetable' >
            <div className="timetable-title">
                Time Table
            </div>
            <TableContainer component={Paper} className="timetable-table">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Days/Time</TableCell>
                            <TableCell>Monday</TableCell>
                            <TableCell>Tuesday</TableCell>
                            <TableCell>Wednesday</TableCell>
                            <TableCell>Thursday</TableCell>
                            <TableCell>Friday</TableCell>
                            <TableCell>Saturday</TableCell>
                            <TableCell>Sunday</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell>Period 1 (7:30 - 8:15)</TableCell>
                            {
                                row.map((item, index) => {
                                    let course = morningRows.filter(itemS => itemS.dateOfWeek === item)

                                    if (course.length > 0)
                                        return <TableCell key={index} rowSpan={5}>
                                            <div>{course[0].coursename}</div>
                                            <div>{course[0].coursecode}</div>
                                            <div>{course[0].beginDate ? parseToLocalDate(course[0].beginDate) : <></>}</div>
                                            <div>{course[0].endDate ? parseToLocalDate(course[0].endDate) : <></>}</div>
                                        </TableCell>
                                    return <TableCell></TableCell>
                                })
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 2 (8:15 - 9:00)</TableCell>
                            {
                                row.map((item, index) => {

                                    if (index + morningRows.length <= 6)
                                        return <TableCell></TableCell>
                                })
                            }


                        </TableRow>
                        <TableRow>
                            <TableCell>Period 3 (9:00 - 9:45)</TableCell>
                            {
                                row.map((item, index) => {

                                    if (index + morningRows.length <= 6)
                                        return <TableCell></TableCell>
                                })
                            }

                        </TableRow>
                        <TableRow>
                            <TableCell>Period 4 (10:00 - 10:45)</TableCell>
                            {
                                row.map((item, index) => {

                                    if (index + morningRows.length <= 6)
                                        return <TableCell></TableCell>
                                })
                            }

                        </TableRow>
                        <TableRow>
                            <TableCell>Period 5 (10:45 - 11:30)</TableCell>
                            {
                                row.map((item, index) => {

                                    if (index + morningRows.length <= 6)
                                        return <TableCell></TableCell>
                                })
                            }

                        </TableRow>

                        <TableRow>
                            <TableCell>Period 6 (13:00 - 13:45)</TableCell>
                            {
                                row.map((item, index) => {
                                    let course = afternoonRows.filter(itemS => itemS.dateOfWeek === item)

                                    if (course.length > 0)
                                        return <TableCell key={index} rowSpan={5}>
                                            <div>{course[0].coursename}</div>
                                            <div>{course[0].coursecode}</div>
                                            <div>{course[0].beginDate ? parseToLocalDate(course[0].beginDate) : <></>}</div>
                                            <div>{course[0].endDate ? parseToLocalDate(course[0].endDate) : <></>}</div>
                                        </TableCell>
                                    return <TableCell></TableCell>
                                })
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 7 (13:45 - 14:30)</TableCell>
                            {
                                row.map((item, index) => {

                                    if (index + afternoonRows.length <= 6)
                                        return <TableCell></TableCell>
                                })
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 8 (14:30 - 15:15)</TableCell>
                            {
                                row.map((item, index) => {

                                    if (index + afternoonRows.length <= 6)
                                        return <TableCell></TableCell>
                                })
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 9 (15:30 - 16:15)</TableCell>
                            {
                                row.map((item, index) => {

                                    if (index + afternoonRows.length <= 6)
                                        return <TableCell></TableCell>
                                })
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 10 (16:15 - 17:00)</TableCell>
                            {
                                row.map((item, index) => {

                                    if (index + afternoonRows.length <= 6)
                                        return <TableCell></TableCell>
                                })
                            }
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}

Timetable.propTypes = {
    data: PropTypes.array
}

export default Timetable
