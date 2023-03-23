import React, {useEffect, useState} from 'react'
import unionBy from 'lodash/unionBy'
import Header from '../../common-components/header/header'
import Footer from '../../common-components/footer/footer'
import "./advance-mode.scss"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CpuRightBar from '../cpu/cpu-right-bar/cpu-right-bar'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import AdnvanceSelect from './advance-select'
import AdvanceTable from './advance-table'
import Typography from "@mui/material/Typography";
import OnOffSwitch from '../../common-components/onoff-switch'
import {
    ACCOUNT_NAME,
    ADD_STAKE_LABEL,
    EXISTING_LABELS,
    RENEW_LABEL,
    RENTAL_LABEL,
    USER_TYPE
} from '../../../global/constant';
import {WaxApi} from '../../../global/api/wax-api';
import {API_STATUS, CACHE_KEY} from '../../../global/constant';
import {Loader} from '../../common-components/loader/loader';
import {
    getSubscriberFromLocalStorage,
    handleSubscriberFilter,
    setSubscriberInLocalStorage,
    validateWallet,
    sanitizeWallet,
    clearFromLocalStorage
} from '../../../global/helper';
import {Rental} from "../../../global/cpu_rental/rental";
import {useSearchParams} from "react-router-dom";


const AdvanceMode = ({loggedInUser, ual}) => {
    const [searchParams] = useSearchParams();
    const refWallet = sanitizeWallet(searchParams.get('ref')) || ACCOUNT_NAME;

    let storedUsers = getSubscriberFromLocalStorage(CACHE_KEY.SUBSCRIBER);
    const [dataLoadStatus, setDataLoadStatus] = useState(API_STATUS.NOT_STARTED)
    const [allSubscribers, setAllSubscribers] = useState([])
    const [existingUsersData, setExistingUsersData] = useState([]);
    const [newUsersData, setNewUsersData] = useState([]);
    const [vipDiscount, setVipDiscount] = useState(100);
    const [rentalPrice, setRentalPrice] = useState(0);
    const [users, setUsers] = useState("")


    const [userFilter, setUserFilter] = useState(USER_TYPE.NEW_USER)

    const [existingPreset1, setExistingPreset1] = useState(100)
    const [existingPreset2, setExistingPreset2] = useState(3)
    const [newPresetDays, setNewPresetDays] = useState(1)
    const [newPresetStake, setNewPresetStake] = useState(50)


    const addUsersToLocal = () => {
        const validUser = [];
        const invalidUser = [];
        const usersList = users.trim().split(/[\s,\n]+/).filter(user => user !== '').map(user => sanitizeWallet(user))

        usersList.forEach((user) => {
            if (!!validateWallet(user)) {
                validUser.push(user);
            } else {
                invalidUser.push(user);
            }
        })
        //update tables
        if (invalidUser.length) {
            alert(`Invalid Users: ${invalidUser.join(', ')}`);
        } else {
            let unionUser = [...new Set([...validUser, ...storedUsers])];
            storedUsers = unionUser
            setSubscriberInLocalStorage(unionUser)
            setUsers('');
            filterUsers();
            setUsers("")
        }
    }

    const filterUsers = async () => {
        console.log(':: allSubscribers ', allSubscribers);
        let subscriberMap = await allSubscribers.reduce((map, subscriber) => {
            map[subscriber.account] = subscriber;
            return map;
        }, {});
        let existingSubscribers = [];
        let newSubscribers = [];
        for (let i = 0; i < storedUsers.length; i++) {
            if (storedUsers[i] in subscriberMap) {
                console.log(subscriberMap)
                console.log(subscriberMap[storedUsers[i]])
                existingSubscribers.push(subscriberMap[storedUsers[i]])
            } else {
                newSubscribers.push({
                    account: storedUsers[i],
                    stake: 0,
                    renewal: 0
                })
            }
        }
        setExistingUsersData([...existingSubscribers])
        setNewUsersData([...newSubscribers])
    }

    useEffect(() => {
            filterUsers();
    }, [allSubscribers.length])


    const updateSubscriber = () => {
        // setDataLoadStatus(API_STATUS.LOADING)
        // const dataLoaders = [rentalService.subscriberDataForAdvanceMode()]
        // Promise.all(dataLoaders).then(response => {
        //     const [subscriberData] = response
        //     // setAllSubscribers([...subscriberData]);
        //     // if (subscriberData.rows.length>0) {
        //     //     const unionSubscriberList = unionBy(subscriberData.rows, subscribersCacheData, 'account')
        //     //     const { existingUsers, newUsers } = handleSubscriberFilter(unionSubscriberList);
        //     //     setExistingUsersData(existingUsers);
        //     //     setNewUsersData(newUsers);
        //     // } else {
        //     //     return null;
        //     // }

        //     setDataLoadStatus(API_STATUS.SUCCESS)
        // }).catch(err => {
        //     console.log(err)
        //     setDataLoadStatus(API_STATUS.FAILED)
        // })

    }

    useEffect(() => {
        return () => {
            if (ual && ual?.activeUser !== null) {
                console.log(loggedInUser)
                const dataToBeLoaded = [rentalService.vipDiscount()]
                Promise.all(dataToBeLoaded).then(response => {
                    const [discount] = response
                    setVipDiscount(discount)
                    console.log("discount is" + discount)
                    setDataLoadStatus(API_STATUS.SUCCESS)
                }).catch(err => {
                    console.log(err)
                    setDataLoadStatus(API_STATUS.FAILED)
                })
            }
        };
    }, [ual]);

    const rentalService = new Rental(ual, updateSubscriber, refWallet);

    useEffect(() => {
        setDataLoadStatus(API_STATUS.LOADING);
        const dataLoaders = [rentalService.rate(), rentalService.subscriberDataForAdvanceMode()]
        Promise.all(dataLoaders).then(async (response) => {
            const [rentalPricing, subscriberData] = response
            setRentalPrice(rentalPricing)
            setAllSubscribers([...subscriberData]);
            // await sleep(10);
            // filterUsers()
            setDataLoadStatus(API_STATUS.SUCCESS)
        }).catch(err => {
            console.log(err)
            setDataLoadStatus(API_STATUS.FAILED)
        })
    }, [])

    // const reloadSubscribers = () => {
    //     setDataLoadStatus(API_STATUS.LOADING)
    //     const dataLoaders = [rentalService.subscriberDataForAdvanceMode()]
    //     Promise.all(dataLoaders).then(response => {
    //         const [subscriberData] = response
    //         setAllSubscribers(subscriberData)
    //         setDataLoadStatus(API_STATUS.SUCCESS)
    //     }).catch(err => {
    //         alert(err)
    //         setDataLoadStatus(API_STATUS.FAILED)
    //     })
    // }

    const handleRental = (wallet,extraStake, extraDays, label) => {
        //TODO add discounts
        rentalService.rentalTransaction(wallet,extraStake,extraDays,rentalPrice,label,vipDiscount)
    }




    const totalCharges = (stakeAdded, days, type) => {
        let totalCost = 0
        if (EXISTING_LABELS.includes(type)) {
            existingUsersData.forEach(subscriber => {
                if (stakeAdded !== null && days === null) {
                    const renewalDays = Math.round((subscriber.renewal - new Date()) / 86400000)
                    //TODO implement discount
                    totalCost += Rental.rentalCharges(stakeAdded, renewalDays, rentalPrice, false)
                } else if (stakeAdded === null && days !== null) {
                    totalCost += Rental.rentalCharges(subscriber.stake, days, rentalPrice, true)
                }
            })
        } else {
            newUsersData.forEach(subscriber => {
                if (stakeAdded > 0 && days > 0) {
                    totalCost += Rental.rentalCharges(stakeAdded, days, rentalPrice, false)
                }
            })
        }
        return totalCost
    }

    const bulkRent = (stakeAdded, days, type) => {
        let actions = []
        if (EXISTING_LABELS.includes(type)) {
            existingUsersData.forEach(subscriber => {
                const memo = rentalService.rentalMemo(type, subscriber.account)
                if (type === ADD_STAKE_LABEL) {
                    const renewalDays = Math.round((subscriber.renewal - new Date()) / 86400000)
                    const cost = Rental.rentalCharges(stakeAdded, renewalDays, rentalPrice, false)
                    actions.push(rentalService.rentalAction(cost, memo))
                } else {
                    const cost = Rental.rentalCharges(subscriber.stake, days, rentalPrice, true)
                    actions.push(rentalService.rentalAction(cost, memo))
                }
            })
        } else {
            newUsersData.forEach(subscriber => {
                const cost = Rental.rentalCharges(stakeAdded, days, rentalPrice, false)
                const memo = rentalService.rentalMemo(type, subscriber.account, days)
                actions.push(rentalService.rentalAction(cost, memo))
            })
        }
        setDataLoadStatus(API_STATUS.LOADING)
        rentalService.batchedTransactions(actions).then(
            succ => {
                alert("Success")
                setDataLoadStatus(API_STATUS.SUCCESS)
            }
        ).catch(e => setDataLoadStatus(API_STATUS.FAILED) )
    }

    const deleteFromCache = (users) => {
        clearFromLocalStorage(CACHE_KEY.SUBSCRIBER,users);
        storedUsers = getSubscriberFromLocalStorage(CACHE_KEY.SUBSCRIBER);
        filterUsers()
    }

    return (
        <div>
            <Loader isLoading={dataLoadStatus === API_STATUS.LOADING}/>
            <div className='cpuOuter'>
                <Container fixed>
                    <Grid container spacing={2}>
                        <Grid item md={12} xs={12}>
                            <div className='cpuLeftBx'>
                                <div className='advHeadOuter'>
                                    <div className='advmodeHd'>
                                        <Typography variant="h4" sx={{paddingBottom: '5px'}} color="text.primary"
                                                    component="h4">CPU Rentals (Super Mode)</Typography>
                                        {/*<span>(Congrats you are receiving 10% cashback on purchases)</span>*/}
                                    </div>
                                    {/* <div className='onoffSwitch'>
                                            <OnOffSwitch />
                                        </div> */}
                                </div>
                                <div className='advtxtFrm'>
                                    <TextField
                                        id="filled-multiline-static"
                                        label="Multiline"
                                        multiline
                                        rows={4}
                                        placeholder="wallet1,wallet2"
                                        onChange={(e) => setUsers(e.target.value)}
                                        variant="filled"
                                        value={users}
                                    />
                                </div>
                                <div className='addtextBtn'>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        onClick={() => {
                                            addUsersToLocal();
                                        }}
                                    >
                                        Add to list
                                    </Button>
                                    &nbsp;
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        onClick={() => {
                                            deleteFromCache(storedUsers);
                                        }}
                                    >
                                        Clear All
                                    </Button>

                                    &nbsp;
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        onClick={() => {
                                            deleteFromCache(existingUsersData.map(user => user.account));
                                        }}
                                    >
                                        Clear Existing
                                    </Button>

                                    &nbsp;
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        onClick={() => {
                                            deleteFromCache(newUsersData.map(user => user.account));
                                        }}
                                    >
                                        Clear New
                                    </Button>

                                </div>
                                {/* <div className='selectTypeBx'>
                                        <Grid container spacing={2}>
                                            <Grid item md={2} sm={4} xs={5} className="selectLabel">Select Type</Grid>
                                            <Grid item md={6} sm={7} xs={7} className="Advselect">
                                                <AdnvanceSelect />
                                            </Grid>
                                        </Grid>
                                    </div> */}

                                <div className='advanceTableBx'>
                                    <AdvanceTable
                                        newUsers={newUsersData}
                                        existingUsers={existingUsersData}
                                        vipDiscount={vipDiscount}
                                        rentalPrice={rentalPrice}
                                        setUserFilter={setUserFilter}
                                        handleRental={handleRental}
                                        deleteFromCache={deleteFromCache}

                                    />
                                    <div className='bulkactMain'>
                                        <h4 className='mulkactHd'>Bulk Action</h4>
                                        {
                                            userFilter===USER_TYPE.NEW_USER ?
                                                (
                                                    <div className='pusetSrch_Outer'>
                                                        <div className='pusetBx'>
                                            <div className='pusetLeft'>Add</div>
                                            <div className='pusetMid'>
                                            <TextField id="standard-basic"
                                                       value={newPresetStake}
                                                       variant="standard"
                                                       onChange={(e) => setNewPresetStake(Number(e.target.value))}
                                            />
                                            </div>
                                            <div className='pusetRight'>WAX for</div>
                                            <div className='pusetMid'>
                                                <TextField id="standard-basic"
                                                           value={newPresetDays}
                                                           variant="standard"
                                                           onChange={(e) => setNewPresetDays(Number(e.target.value))}
                                                />
                                            </div>
                                            <div className='pusetRight'>days </div>
                                            <div className='pusetpayBtn'>
                                                <Button className='payBtn'
                                                        onClick={() => bulkRent(newPresetStake,newPresetDays, RENTAL_LABEL)}>
                                                    {totalCharges(newPresetStake, newPresetDays, RENTAL_LABEL).toFixed(3) + " WAX"}
                                                </Button>
                                            </div>
                                            </div>
                                                    </div>)
                                            :
                                            ( <div className='pusetSrch_Outer'>
                                            <div className='bulkactNew'>
                                            <div className='incrStake_Left'>Increase Stake for all users by</div>
                                            <div className='incrStake_Mid'>
                                            <TextField id="standard-basic" variant="standard"
                                            value={existingPreset1}
                                            onChange={(e) => setExistingPreset1(Number(e.target.value))}/>
                                            </div>
                                            <div className='incrStake_Right'>WAX</div>
                                            <div className='pusetpayBtn'><Button className='payBtn'
                                            onClick={() => bulkRent(existingPreset1, null, ADD_STAKE_LABEL)}>
                                        {totalCharges(existingPreset1, null, ADD_STAKE_LABEL).toFixed(3) + " WAX"}
                                            </Button>
                                            </div>
                                            </div>
                                            <div className='bulkactNew'>
                                            <div className='incrStake_Left'>Add days for all users</div>
                                            <div className='incrStake_Mid'>
                                            <TextField id="standard-basic" variant="standard"
                                            value={existingPreset2}
                                            onChange={(e) => setExistingPreset2(Number(e.target.value))}/>
                                            </div>
                                            <div className='incrStake_Right'></div>
                                            <div className='pusetpayBtn'><Button className='payBtn'
                                            onClick={() => bulkRent(null, existingPreset2, RENEW_LABEL)}>
                                        {totalCharges(null, existingPreset2, RENEW_LABEL).toFixed(3) + " WAX"}
                                            </Button>
                                            </div>
                                            </div>
                                            </div>)
                                        }


                                    </div>
                                </div>
                                {/* <div className='submitAll'>
                                        <Button>Submit All</Button>
                                    </div> */}
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            {/*<Footer />*/}
        </div>
    )
}

export default AdvanceMode