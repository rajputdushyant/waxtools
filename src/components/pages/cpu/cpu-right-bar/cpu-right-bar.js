import React from 'react'
import Button from '@mui/material/Button'
import {Link} from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2";
import {CardContent, CardMedia} from "@mui/material";
import WaxLogo from "../../../../assets/images/wax-logo.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ADD_STAKE_LABEL} from "../../../../global/constant";
import {Rental} from "../../../../global/cpu_rental/rental";

const CpuRightBar = ({investor}) => {

    return (
        <Grid2 container>
            {/*<Grid2 container spacing={2} >*/}
            {/*    <Grid2 item md={6} xs={12} sx={{border: '1px solid #c490f3'}} variant='outlined' color='text.primary'*/}
            {/*           alignSelf='left' alignItems='center' justifyItems='center'>*/}
            {/*        <Grid2 container alignItems='center' justifyContent='center'>*/}
            {/*            <Grid2 item>*/}
            {/*                <CardMedia*/}
            {/*                    component="img"*/}
            {/*                    sx={{width: 60}}*/}
            {/*                    image={WaxLogo}*/}
            {/*                />*/}
            {/*            </Grid2>*/}
            {/*            <Grid2 item>*/}
            {/*                <Box sx={{display: 'flex', flexDirection: 'column'}}>*/}
            {/*                    <CardContent sx={{flex: '1 0 auto'}}>*/}
            {/*                        <Typography component="div" variant="h6" color='secondary.main'>Available to Stake</Typography>*/}
            {/*                        <br/>*/}
            {/*                        <Typography component="div"*/}
            {/*                                    variant="h4">{Number(totalWAXBalance).toFixed(2)} WAX <Typography component="span">(${(Number(totalWAXBalance) * waxToUSDRate).toFixed(2)})</Typography></Typography>*/}
            {/*                    </CardContent>*/}
            {/*                </Box>*/}
            {/*            </Grid2>*/}
            {/*        </Grid2>*/}

            {/*    </Grid2>*/}
            {/*    <Grid2 item md={6} xs={12} sx={{border: '1px solid #c490f3'}} variant='outlined' color='text.primary'*/}
            {/*           alignItems='center' justifyContent='center' >*/}
            {/*        <Grid2 container alignItems='center' justifyContent='center'>*/}
            {/*            <Grid2 item>*/}
            {/*                <CardMedia*/}
            {/*                    component="img"*/}
            {/*                    sx={{width: 60}}*/}
            {/*                    image={WaxLogo}*/}
            {/*                />*/}
            {/*            </Grid2>*/}
            {/*            <Grid2 item>*/}
            {/*                <Box sx={{display: 'flex', flexDirection: 'column'}} alignItems='center' >*/}
            {/*                    <CardContent sx={{flex: '1 0 auto'}}>*/}
            {/*                        <Typography component="div" variant="h6" color='secondary.main'>Price</Typography>*/}
            {/*                        <br/>*/}
            {/*                        <Typography component="div"*/}
            {/*                                    variant="h4">{(rentalPrice*100).toFixed(3)}% / day</Typography>*/}

            {/*                    </CardContent>*/}
            {/*                </Box>*/}
            {/*            </Grid2>*/}
            {/*        </Grid2>*/}


            {/*    </Grid2>*/}

            {/*</Grid2>*/}
            <Box sx={{border: '1px solid #c490f3'}} className="gridBx" variant='outlined' color='text.primary'
                 alignItems='center' justifyContent='center' padding={6} width={'100%'} marginTop={0}>
                <Typography component="div" variant="h6" color='secondary.main'>Investment:</Typography>
                <br/>
                <Typography component="div" variant="h4">{(investor?.invested) ?? '0 WAX'}</Typography>
                <br/>
                <Button variant="outlined" size="small" color="secondary" >Withdraw</Button>
            </Box>
            <Box sx={{border: '1px solid #c490f3'}} className="gridBx" variant='outlined' color='text.primary'
                 alignItems='center' justifyContent='center' padding={6} width={'100%'} marginTop={2}>
                <Typography component="div" variant="h6" color='secondary.main'>Insight 1:</Typography>
                <br/>
                <Typography component="div" variant="h5">Interesting insight will be displayed here</Typography>
                <br/>

            </Box>
            <Box sx={{border: '1px solid #c490f3'}} className="gridBx" variant='outlined' color='text.primary'
                 alignItems='center' justifyContent='center' padding={6} width={'100%'} marginTop={2}>
                <Typography component="div" variant="h6" color='secondary.main'>Advertisement</Typography>
                <br/>
                <Typography component="div"
                            variant="h5">Contact us on Twitter for placing ads</Typography>
                <br/>

            </Box>
            {/*<div className='stakedwaxedBx'>*/}
            {/*    <div className='stakeTop'>*/}
            {/*        <span>Insights</span>*/}
            {/*        <h2>-</h2>*/}
            {/*    </div>*/}
            {/*    <div className='stakeBot'>*/}
            {/*        <p>Interesting insights about your account will be displayed here </p>*/}
            {/*        /!*<Link to="/">Visit Staking</Link>*!/*/}
            {/*    </div>*/}

            {/*</div>*/}
            {/* <div className='downloadBx'>
                    <strong>Download Wax Transactions</strong>
                    <p>Download a CSV file connecting of WAX trading for this account Services times to maximumthat 5,000 WAX transfers.</p>
                    <Link to="/">Download CSV</Link>
                </div> */}
        </Grid2>
    )
}

export default CpuRightBar