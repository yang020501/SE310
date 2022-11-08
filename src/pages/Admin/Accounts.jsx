import React from 'react'
import { Grid, TextField } from "@mui/material"
import MyBlock from '../../components/MyBlock'
import TxtField from '../../components/TxtField'
import MyButton from '../../components/MyButton'
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Accounts = () => {
  return (
    <Grid container spacing={1} direction={'column'}>
      <Grid item>
        <MyBlock>
          <div className="account-search">
            <TxtField type='text'>

            </TxtField>
            <MyButton>
              Search
            </MyButton>
          </div>
        </MyBlock>
      </Grid>
      <Grid item>
        <MyBlock padding={"1rem 0 0 0"}>
          <div className="account-table">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead >
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                  >
                    <TableCell component="th" scope="row">Hello
                    </TableCell>
                    <TableCell align="right">hello</TableCell>
                    <TableCell align="right">hello</TableCell>
                    <TableCell align="right">hello</TableCell>
                    <TableCell align="right">hello</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </MyBlock>
      </Grid>
    </Grid>
  )
}

export default Accounts