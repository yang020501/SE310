import React from 'react'
import PropTypes from 'prop-types'
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { TableCell } from '@mui/material';
const Timetable = props => {
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
                            <TableCell>Saturday</TableCell>
                            <TableCell>Sunday</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        </StyledTableRow>
                    ))} */}
                        <TableRow>
                            <TableCell>Period 1 (7:30 - 8:15)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 2 (8:15 - 9:00)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 3 (9:00 - 9:45)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 4 (10:00 - 10:45)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 5 (10:45 - 11:30)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 6 (13:00 - 13:45)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 7 (13:45 - 14:30)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 8 (14:30 - 15:15)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 9 (15:30 - 16:15)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Period 10 (16:15 - 17:00)</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}

Timetable.propTypes = {

}

export default Timetable
