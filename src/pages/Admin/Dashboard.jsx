import { Grid } from '@mui/material'
import React from 'react'
import MyBlock from '../../components/MyBlock'

const Dashboard = () => {
  return (
    <Grid container spacing={1} direction={"column"} >
      <Grid item >
        <MyBlock >
          <div className='dashboard'>
            <div className='dashboard-header'>
              <div className="dashboard-header-title">
                Welcome to Pearn admin Panel
              </div>
            </div>
            <div className="dashboard-body">
              <div className="dashboard-body-item">
                <div className="dashboard-body-item-title">
                  Total Users
                </div>
                <div className="dashboard-body-item-value">
                  12362
                </div>
              </div>
              <div className="dashboard-body-item">
                <div className="dashboard-body-item-title">
                  Total Coures
                </div>
                <div className="dashboard-body-item-value">
                  122
                </div>
              </div>
              <div className="dashboard-body-item">
                <div className="dashboard-body-item-title">
                  Active Users
                </div>
                <div className="dashboard-body-item-value">
                  252
                </div>
              </div>
            </div>
          </div>
        </MyBlock>
      </Grid>
      <Grid item >
        <MyBlock >
          Account
        </MyBlock>
      </Grid>
      <Grid item >
        <MyBlock >
          Course
        </MyBlock>
      </Grid>

    </Grid>

  )
}

export default Dashboard
