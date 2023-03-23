import React from 'react'
import Logo from '../../../assets/images/logo.png'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import "./footer.scss"

import { Link } from "react-router-dom";

const Footer =()=>{

    return (
                <footer>
                    <Container>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item sm={6} xs={12}>
                                    {/* <div className='LogoBx'>
                                        <Link to="/"><img src={Logo} alt="" /></Link>
                                    </div> */}
                                </Grid>
                                
                                <Grid item sm={6} xs={12}>
                                    <div className='footrNav'>
                                        <Link>Privacy Policy</Link>
                                        <Link>Terms</Link>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </footer>
        )
    }

export default Footer