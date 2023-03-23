import React, {useState} from 'react'
import {useNavigate, useSearchParams} from "react-router-dom";

import "./home.scss"
import {ROUTES} from '../../../global/constant';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {createURL, validateWallet} from "../../../global/helper";
import * as PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const Home = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const ref = searchParams.get('ref');
    const [wallet, setWallet] = useState('');


    const fetchWallet = () => {
        if (validateWallet(wallet)) {
            let url = createURL(ROUTES.CPU_RENTAL, { wallet:  wallet})
            if(ref!==null) {
                url = createURL(ROUTES.CPU_RENTAL, { wallet:  wallet},{ ref });
            }
            navigate(url);
        } else {
            alert("Invalid Wallet")
        }

    }


    return (
        <div className="homeOuter">
            <Box>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12}   align="center">
                        <Typography variant="h3" color="text.primary" component="h3">
                            Enter Wallet:
                        </Typography>;
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12}   align="center">
                        <TextField  variant="filled" size="normal"
                                    value={wallet}
                                    onChange={(event) => {
                                        setWallet(event.target.value);
                                    }}/>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12}   align="center">
                        <Button variant="outlined" size="large" color="secondary" onClick={fetchWallet}>Rent CPU</Button>
                    </Grid>
                </Grid>
            </Box>


        </div>
    )
}

export default Home