import React, {useState} from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import ProgressBar from './progressbar';
import SelectList from './select-list';
import WaxLogo from '../../../../assets/images/wax-logo.png'
import {
    ADD_STAKE_LABEL,
    RENEW_LABEL,
    RENTAL_LABEL, ROUTES,
} from '../../../../global/constant';
import {convertMemory} from '../../../../global/helper';
import dayjs from "dayjs";
import {Rental} from "../../../../global/cpu_rental/rental";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Card} from "reactstrap";
import {CardContent, CardMedia, InputAdornment, makeStyles} from "@mui/material";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import EditModal from "../cpu-left-bar/edit-modal";
import { Link, useNavigate } from "react-router-dom";

const CpuLeftBar = (props) => {
    const navigate = useNavigate();
    const [stake, setStake] = useState(100);
    const [day, setDay] = useState(1);
    const [extraDays, setExtraDays] = useState(3);
    const [extraStake, setExtraStake] = useState(10)

    const {
        wallet,
        totalWAXBalance,
        subscriber,
        waxToUSDRate,
        resources,
        rentalPrice,
        vipDiscount,
        rentalService
    } = props;


    const renewCpu = () => {
        if (extraDays < 3 || (extraDays >= 3 && extraDays % 3 !== 0)) {
            alert("Only renewals in multiples of 3 days allowed")
        } else {
            rentalService.rentalTransaction(wallet, subscriber.stake, extraDays, rentalPrice, RENEW_LABEL, vipDiscount)
        }
    }

    const styling = {
        container: {
            paddingRight: 2,
            paddingLeft: 2
        }
    }
    return (
        <Box height='100%' sx={{flexGrow: 1}}>
            <Grid2 container columnSpacing={{ md:86, lg:86}}>
                <Grid2 item align='left'>
                    <Box display="flex">
                        <Typography variant="h4" color="text.primary" component="h4">{wallet} &nbsp;</Typography>
                        {/* <Button variant="outlined" size="small" color="secondary">Edit</Button> */}
                        {/*<EditModal/>*/}
                    </Box>
                </Grid2>
                <Grid2 item align='right'>
                    <Box display='flex'>
                        <Button
                            variant="outlined"
                            size="medium"
                            onClick={() => {
                                navigate(ROUTES.ADVANCE_MODE);
                            }}
                        >
                            Advance Mode
                        </Button>
                        {/* <Link to={ROUTES.ADVANCE_MODE}>Advance Mode</Link> */}
                    </Box>
                </Grid2>
            </Grid2>
            <Grid2 container spacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid2 md={6} xs={12} sx={{paddingTop: '0px'}}>
                    <Grid2 item className="gridBx" alignSelf='left' color='text.primary' display='flex'
                           alignItems='center' justifyItems='center' sx={{border: '1px solid #c490f3'}}
                           justifyContent='center'>
                        <Grid2 item>
                            <CardMedia
                                component="img"
                                sx={{width: 60}}
                                image={WaxLogo}
                            />
                        </Grid2>
                        <Grid2 item>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <CardContent sx={{flex: '1 0 auto'}}>
                                    <Typography component="div" variant="h6" color='secondary.main'>Available to
                                        Stake</Typography>
                                    <br/>
                                    <Typography component="div"
                                                variant="h4">{Number(totalWAXBalance).toFixed(2)} WAX <Typography
                                        component="span">(${(Number(totalWAXBalance) * waxToUSDRate).toFixed(2)})</Typography></Typography>
                                </CardContent>
                            </Box>
                        </Grid2>
                    </Grid2>

                </Grid2>
                <Grid2 item md={6} xs={12} sx={{paddingTop: '0px'}} variant='outlined' color='text.primary'
                       alignItems='center' justifyContent='center'>
                    <Grid2 className="gridBx" display='flex' alignItems='center' sx={{border: '1px solid #c490f3'}}
                           justifyContent='center'>
                        <Grid2 item>
                            <CardMedia
                                component="img"
                                sx={{width: 60}}
                                image={WaxLogo}
                            />
                        </Grid2>
                        <Grid2 item>
                            <Box sx={{display: 'flex', flexDirection: 'column'}} alignItems='center'>
                                <CardContent sx={{flex: '1 0 auto'}}>
                                    <Typography component="div" variant="h6" color='secondary.main'>Price</Typography>
                                    <br/>
                                    <Typography component="div" variant="h4">{(rentalPrice * 100).toFixed(3)}% /
                                        day</Typography>

                                </CardContent>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
            {subscriber ? (
                <Grid2 container spacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    <Grid2 item md={6} xs={12} variant='outlined' color='text.primary'
                           alignSelf='left' alignItems='center' justifyItems='center'>
                        <Grid2 className="gridBx" alignItems='center' sx={{border: '1px solid #c490f3'}}
                               justifyContent='center'>
                            <Box bgcolor='background.paper' p={5}>
                                <Typography component="div" variant="h6" color='secondary.main'>Current
                                    Stake</Typography>
                                <br/>
                                <Typography component="div" variant="h4">{subscriber.stake.toFixed(2)} WAX</Typography>
                            </Box>
                            <Grid2 container alignItems='center' p={3} justifyContent='center'>
                                <Grid2 item>
                                    <TextField variant="filled" size="normal" alignItems='center' justifyItems='center'
                                               className='textInp' color='primary.text' sx={{color: '#fff'}}
                                               InputProps={{
                                                   endAdornment: <InputAdornment position="start"
                                                                                 sx={{color: '#fff'}}>WAX</InputAdornment>,
                                               }}
                                               value={extraStake}
                                               onChange={(event) => {
                                                   setExtraStake(Number(event.target.value))
                                               }}></TextField>
                                </Grid2>
                                <Grid2 item>
                                    <Button variant="outlined" size="large" className="largeBtn"
                                            onClick={() => rentalService.rentalTransaction(wallet, extraStake, Math.round((subscriber.renewal - new Date()) / 86400000), rentalPrice, ADD_STAKE_LABEL, vipDiscount)}>Pay {Rental.rentalCharges(extraStake, Math.round((subscriber.renewal - new Date()) / 86400000), rentalPrice, false, vipDiscount).toFixed(3)} WAX</Button>
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 item md={6} xs={12} variant='outlined' color='text.primary'
                           alignSelf='left' alignItems='center' justifyItems='center'>
                        <Grid2 className="gridBx" alignItems='center' sx={{border: '1px solid #c490f3'}}
                               justifyContent='center'>
                            <Box bgcolor='background.paper' p={5}>
                                <Typography component="div" variant="h6" color='secondary.main'>Expiring
                                    on: </Typography>
                                <br/>
                                <Typography component="div"
                                            variant="h4">{dayjs(subscriber.renewal).format('MMM DD, YYYY hh:mm:ss A')}</Typography>
                            </Box>
                            <Grid2 container alignItems={'center'} p={3} justifyContent='center'>
                                <Grid2 item>
                                    <TextField variant="filled" size="normal" className='textInp'
                                               InputProps={{
                                                   endAdornment: <InputAdornment position="start"
                                                                                 sx={{color: '#fff'}}>DAYS</InputAdornment>,
                                               }}
                                               value={extraDays}
                                               onChange={(event) => {
                                                   setExtraDays(Math.floor(Number(event.target.value)))
                                               }}></TextField>
                                </Grid2>
                                <Grid2 item>
                                    <Button variant="outlined" size="large" color="secondary" className="largeBtn"
                                            onClick={() => renewCpu()}>Pay {Rental.rentalCharges(subscriber.stake, extraDays, rentalPrice, true, vipDiscount).toFixed(3)} WAX</Button>
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
            ) : (
                <Grid2 sx={{width: '100%'}}>
                    <Grid2 spacing={2} className="gridBx" container variant='outlined'
                           sx={{border: '#c490f3 solid 1px'}} color='text.primary'
                           alignItems='center' justifyContent='center' marginY={1} marginX={0} paddingY={5}>
                        <Grid2 item margin={2} className="gridBx" alignItems='center' justifyContent='center'>
                            <Typography component="div" variant="h6" color="secondary.main" sx={{marginBottom: '10px'}}>How
                                much stake?</Typography>
                            <TextField variant="filled" size="normal" className='textInp'
                                       InputProps={{
                                           endAdornment: <InputAdornment position="start"
                                                                         sx={{color: '#fff'}}>WAX</InputAdornment>,
                                       }}
                                       value={stake}
                                       onChange={(event) => {
                                           setStake(Number(event.target.value));
                                       }}></TextField>
                        </Grid2>
                        <Grid2 item margin={2} className="gridBx" alignItems='center' justifyContent='center'>
                            <Typography component="div" variant="h6" color="secondary.main" sx={{marginBottom: '10px'}}>How
                                many days?</Typography>
                            <TextField variant="filled" size="normal" className='textInp'
                                       InputProps={{
                                           endAdornment: <InputAdornment position="start"
                                                                         sx={{color: '#fff'}}>DAYS</InputAdornment>,
                                       }}
                                       value={day}
                                       onChange={(event) => {
                                           setDay(Number(event.target.value));
                                       }}></TextField>
                        </Grid2>
                        <Grid2 item margin={2}>
                            <br/><br/>
                            <Button variant="outlined" size="large" color="secondary" className="largeBtn"
                                    sx={{marginTop: '5px'}}
                                    onClick={() => rentalService.rentalTransaction(wallet, stake, day, rentalPrice, RENTAL_LABEL, vipDiscount)}>Pay {Rental.rentalCharges(stake, day, rentalPrice, false, vipDiscount).toFixed(3)} WAX</Button>

                        </Grid2>
                    </Grid2>
                </Grid2>
            )}

            <Grid2 spacing={2} container alignItems='center' justifyContent='center' marginTop={0}>
                <Grid2 md={4} item variant='outlined' color='text.primary'>
                    <Grid2 className="gridBx ramBx" alignItems='center' sx={{border: '1px solid #c490f3'}}
                           justifyContent='center'>
                        <Typography component="div" variant="h5" color="secondary.main">RAM</Typography>
                        {resources?.ram_usage ? (
                            <>
                                <Typography component="div" variant="subtitle2"
                                            color="primary.text"> ({convertMemory(resources.ram_usage)} / {convertMemory(resources.ram_quota)}) </Typography>
                                <ProgressBar sx={{height: '15px'}}
                                             progress={(resources.ram_usage * 100) / resources.ram_quota}/>

                            </>
                        ) : (
                            <Typography component="div" variant="h6" color="primary.text"> --- </Typography>
                        )}
                    </Grid2>
                </Grid2>
                <Grid2 md={4} item variant='outlined' color='text.primary'>
                    <Grid2 className="gridBx ramBx" alignItems='center' sx={{border: '1px solid #c490f3'}}
                           justifyContent='center'>
                        <Typography component="div" variant="h5" color="secondary.main">CPU</Typography>
                        {resources?.cpu_limit ? (
                            <>
                                <Typography component="div" variant="subtitle2"
                                            color="primary.text"> ({convertMemory(resources.cpu_limit.used)} / {convertMemory(resources.cpu_limit.max)}) </Typography>
                                <ProgressBar progress={(resources?.cpu_limit?.used * 100) / resources.cpu_limit.max}/>

                            </>
                        ) : (
                            <Typography component="div" variant="h6" color="primary.text"> --- </Typography>
                        )}
                    </Grid2>
                </Grid2>
                <Grid2 md={4} item variant='outlined' color='text.primary'>
                    <Grid2 className="gridBx ramBx" alignItems='center' sx={{border: '1px solid #c490f3'}}
                           justifyContent='center'>
                        <Typography component="div" variant="h5" color="secondary.main">NET</Typography>
                        {resources?.net_limit ? (
                            <>
                                <Typography component="div" variant="subtitle2" color="primary.text">
                                    ({convertMemory(resources?.net_limit?.used)} / {convertMemory(resources?.net_limit?.max)})
                                </Typography>
                                <ProgressBar progress={(resources?.net_limit?.used * 100) / resources?.net_limit?.max}/>

                            </>
                        ) : (
                            <Typography component="div" variant="h6" color="primary.text"> --- </Typography>
                        )}
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default CpuLeftBar