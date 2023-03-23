import React from 'react'
import Logo from '../../../assets/images/logo.png'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import "./header.scss"
import DashoardMenu from './dashboard-menu'
import { Link } from "react-router-dom";
import Menu from './menu'
import {AppBar} from "@mui/material";

const Header =({ual, loggedInUser})=>{
    const logout = () => {
        ual.logout();
    }
    const login = () => {
        ual?.showModal();
    }
    return (
                <AppBar position="fixed" sx={{backgroundColor: 'rgba(32,6,51,0.7)', borderBottom: '1px solid rgba(0,0,0,0.7)'}}>
                    <Container maxWidth="x1">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={1}>
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                                    <div className='LogoBx'>
                                        <Link to="/"><img src={Logo} alt="" /></Link>
                                    </div>
                                </Grid>
                                <Grid item xl={7} lg={7} md={7} sm={7} xs={7} >
                                    <div className='MenuBx'>
                                        <Menu />
                                    </div>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <div className='ProfileBtn'>
                                        <DashoardMenu color='primary.main' login={login} logout={logout} loggedInUser={loggedInUser} />
                                    </div>
                                    
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </AppBar>
        )
    }

export default Header