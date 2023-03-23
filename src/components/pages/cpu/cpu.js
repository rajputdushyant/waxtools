import React, {useEffect, useState} from 'react'
import {useParams, useNavigate, useSearchParams} from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import "./cpu.scss"
import CpuLeftBar from './cpu-left-bar/cpu-left-bar'
import CpuRightBar from './cpu-right-bar/cpu-right-bar'
import {WaxApi} from '../../../global/api/wax-api';
import {ACCOUNT_NAME, API_STATUS, ROUTES} from '../../../global/constant';
import {Loader} from '../../common-components/loader/loader';
import {createURL, sanitizeWallet, validateWallet} from '../../../global/helper';
import {Rental} from "../../../global/cpu_rental/rental";
import Grid2 from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Cpu = ({loggedInUser, ual}) => {
    const params = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const refWallet = sanitizeWallet(searchParams.get('ref')) || ACCOUNT_NAME;
    let {wallet} = params;
    wallet = wallet.replace(/%20/g, ' ').trim().toLowerCase()
    const waxApi = new WaxApi();

    //All variables
    const [totalWAXBalance, setTotalWAXBalance] = useState(0);
    const [subscriber, setSubscriber] = useState(null);
    const [resources, setAccountResources] = useState(null);
    const [waxToUSDRate, setWaxToUSDRate] = useState(0);
    const [rentalPrice, setRentalPrice] = useState(0);
    const [vipDiscount, setVipDiscount] = useState(100);
    const [investorData, setInvestorData] = useState(null)


    //Loading status
    const [dataLoadStatus, setDataLoadStatus] = useState(API_STATUS.NOT_STARTED)


    const updateSubscriber = () => {

        setDataLoadStatus(API_STATUS.LOADING)
        const dataLoaders = [waxApi.getAccountResources(wallet), waxApi.getWalletBalance(ACCOUNT_NAME), rentalService.subscriberData(wallet)]
        Promise.all(dataLoaders).then(response => {
            const [accountResources, walletBalance, subscriberData] = response

            setAccountResources(accountResources)
            setTotalWAXBalance(walletBalance)
            if (subscriberData !== null) {
                setSubscriber(subscriberData)
            }

            setDataLoadStatus(API_STATUS.SUCCESS)
        }).catch(err => {
            console.log(err)
            setDataLoadStatus(API_STATUS.FAILED)
        })

    }

    const rentalService = new Rental(ual, updateSubscriber,refWallet)


    //discount not applying properly and vip not loading
    useEffect(() => {
        return () => {
            console.log("user is ")
            if (ual.activeUser !== null) {
                console.log(ual.activeUser.accountName)
                const dataToBeLoaded = [rentalService.vipDiscount(), rentalService.investorData()]
                Promise.all(dataToBeLoaded).then(response => {
                    const [discount, investor] = response
                    setVipDiscount(discount)
                    setInvestorData(investor)
                }).catch(err => {
                    console.log(err)
                    setDataLoadStatus(API_STATUS.FAILED)
                })
            }
        };
    }, [ual]);


    useEffect(() => {
        if (validateWallet(wallet)) {
            setDataLoadStatus(API_STATUS.LOADING)
            const dataLoaders = [waxApi.getWAXToUSDRate(), waxApi.getAccountResources(wallet), rentalService.rate(), waxApi.getWalletBalance(ACCOUNT_NAME), rentalService.subscriberData(wallet)]
            Promise.all(dataLoaders).then(response => {
                const [waxPrice, accountResources, rentalPricing, walletBalance, subscriberData] = response

                setWaxToUSDRate(waxPrice ?? 0)
                setAccountResources(accountResources)
                setRentalPrice(rentalPricing)
                setTotalWAXBalance(walletBalance)
                if (subscriberData !== null) {
                    setSubscriber(subscriberData)
                }

                setDataLoadStatus(API_STATUS.SUCCESS)
            }).catch(err => {
                console.log(err)
                setDataLoadStatus(API_STATUS.FAILED)
            })
        } else {
            alert("Invalid Wallet Address")
            const url = createURL(ROUTES.HOME, {ref: refWallet});
            navigate(url);
        }
    }, [wallet]);


    return (
        <div>
            <Loader isLoading={dataLoadStatus === API_STATUS.LOADING}/>
            <div className='cpuOuter'>
                <Container>
                    
                    <Grid2 container spacing={2}>
                        <Grid2 item md={9} xs={12} paddingTop={2}>
                                <CpuLeftBar
                                    wallet={wallet}
                                    totalWAXBalance={totalWAXBalance}
                                    subscriber={subscriber}
                                    waxToUSDRate={waxToUSDRate}
                                    resources={resources}
                                    rentalPrice={rentalPrice}
                                    vipDiscount={vipDiscount}
                                    rentalService={rentalService}
                                />
                        </Grid2>
                        <Grid2 item md={3} xs={12} paddingTop={2}>
                            <div className='cpuRightBx'>
                                <CpuRightBar
                                    investor={investorData}
                                />
                            </div>
                        </Grid2>
                    </Grid2>
                </Container>
            </div>
        </div>
    )
}

export default Cpu