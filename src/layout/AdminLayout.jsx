import React from 'react'
import { Outlet } from "react-router-dom";
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyBlock from '../components/MyBlock';
import MyBreadcrums from '../components/MyBreadcrums';
import MyNavBar from '../components/MyNavBar';
import Section, { SectionBody, SectionTitle } from '../components/Section';
import Grid from '@mui/material/Grid';
const AdminLayout = () => {
    return (
        <React.Fragment>
            <Header />
            <div className='main'>
                <Section>
                    <SectionTitle >
                        <MyBlock >
                            <MyBreadcrums />
                        </MyBlock>

                    </SectionTitle>
                    <SectionBody>
                        <Grid container spacing={1}   >
                            <Grid item lg={2} md={3} sm={3}>
                                <MyBlock>
                                    <MyNavBar />
                                </MyBlock>
                            </Grid>
                            <Grid item lg={8} md={6} sm={7}>
                                <Outlet />
                            </Grid>
                            <Grid item lg={2} md={3} sm={2}>
                                <MyBlock>

                                </MyBlock>
                            </Grid>
                        </Grid>
                    </SectionBody>
                </Section>

            </div>
            <Footer />
        </React.Fragment>
    )
}

export default AdminLayout