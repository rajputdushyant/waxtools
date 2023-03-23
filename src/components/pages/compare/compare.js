import React, {useEffect, useState} from 'react'
import "./compare.scss"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from "@mui/material/Typography";
import PlanIcon1 from '../../../assets/images/plan-icon1.png'
import PlanIcon2 from '../../../assets/images/plan-icon2.png'
import PlanIcon3 from '../../../assets/images/plan-icon3.png'
import WaxLogo from '../../../assets/images/wax-logo.png'
import DollorIcon from '../../../assets/images/dollor-icon.png'
import RightIcon from '../../../assets/images/right.png'

import {CardMedia} from "@mui/material";

const Compare = () => {
  
    return (
        <div>
            <div className='cpuOuter'>
                <Container fixed>
                    <Grid container spacing={2}>
                        <Grid item md={12} xs={12}>
                            <Typography className='rentalHd' component="div" variant="h3" color='secondary.main'>Best CPU Rentals</Typography>
                            <div className='mostImport'>
                                <h4>What’s most important to you?</h4>
                                <span>
                                <FormControl>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue="New User"
                                    >
                                        <MenuItem>Please Select</MenuItem>
                                    </Select>
                                </FormControl>
                                </span>
                            </div>
                            <Typography component="div" className="toprecomHd" variant="h5" color='secondary.main'>Top 3 Recommendations based on your selection</Typography>
                        </Grid>
                        <Grid item md={12} xs={12}  display='flex' alignItems='center' justifyItems='center' >
                            <Grid item md={3} sm={12}>
                                <div className='stokeList'>
                                    <ul>
                                        <li>
                                            <CardMedia
                                                component="img"
                                                sx={{width: 35}}
                                                image={DollorIcon}
                                            /> Price/Day
                                        </li>
                                        <li>
                                            <CardMedia
                                                component="img"
                                                sx={{width: 35}}
                                                image={WaxLogo}
                                            /> Available to Stake
                                        </li>
                                        <li>
                                            <CardMedia
                                                component="img"
                                                sx={{width: 35}}
                                                image={RightIcon}
                                            /> Trust Score
                                        </li>
                                    </ul>
                                </div>
                            </Grid>
                            <Grid item md={3} sm={12}>
                                <div className='plan1Bx'>
                                    <div className='planHd'>
                                        <CardMedia
                                            component="img"
                                            sx={{width: 50}}
                                            image={PlanIcon1}
                                        /> CPU4</div>
                                    <ul>
                                        <li>0.324%/Day</li>
                                        <li>996.00WAX</li>
                                        <li>5</li>
                                    </ul>
                                    <button>RENT</button>
                                </div>
                            </Grid>
                            <Grid item md={3} sm={12}>
                                <div className='plan2Bx'>
                                    <div className='planHd'>
                                        <CardMedia
                                            component="img"
                                            sx={{width: 50}}
                                            image={PlanIcon2}
                                        /> WAXP.TOOLS</div>
                                    <ul>
                                        <li>0.324%/Day</li>
                                        <li>996.00WAX</li>
                                        <li>7</li>
                                    </ul>
                                    <button>RENT</button>
                                </div>
                            </Grid>
                            <Grid item md={3} sm={12}>
                                <div className='plan1Bx'>
                                    <div className='planHd'>
                                        <CardMedia
                                            component="img"
                                            sx={{width: 50}}
                                            image={PlanIcon3}
                                        /> NFT HIVE</div>
                                    <ul>
                                        <li>0.324%/Day</li>
                                        <li>996.00WAX</li>
                                        <li>8</li>
                                    </ul>
                                    <button>RENT</button>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            {/*<Footer />*/}
        </div>
    )
}

export default Compare