import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";

import EditAccountModal from './edit-addount-modal';
import {ADD_STAKE_LABEL, RENEW_LABEL, RENTAL_LABEL, USER_TYPE} from '../../../global/constant';
import { calculateNumberOfDays } from '../../../global/helper';
import {Rental} from "../../../global/cpu_rental/rental";


export default function DenseTable({
  newUsers,
  existingUsers,
  rentalPrice,  
  vipDiscount,
  setUserFilter,
  handleRental,
  deleteFromCache
}){
  const [subscriber, setSubscriber] = useState(null);
  const [extraDays, setExtraDays] = useState({})
  const [extraStake, setExtraStake] = useState({})
  const [readOnlySubscriber, setReadOnlySubscriber] = useState({})
  const handleOpen = (subscriberData) => setSubscriber(subscriberData);
  const handleClose = () => setSubscriber(null);
  const [userType, setUserType] = useState(USER_TYPE.NEW_USER);

  useEffect(() => {
    let extraDaysData = {};
    let extraStakesData = {};
    newUsers.forEach((datum) => {
      extraDaysData = {
        ...extraDaysData,
        [datum.account]: datum.renewal
      };
      extraStakesData = {
        ...extraStakesData,
        [datum.account]: datum.stake
      };
    });
    existingUsers.forEach((datum) => {
      extraDaysData = {
        ...extraDaysData,
        [datum.account]: datum.renewal ? calculateNumberOfDays(new Date().getTime(), datum.renewal) : 0
      };
      extraStakesData = {
        ...extraStakesData,
        [datum.account]: datum.stake ? Number(datum.stake.toFixed(2)) : 0
      };



    });
    setExtraDays({...extraDaysData});
    setExtraStake({...extraStakesData});
  }, [newUsers.length, existingUsers.length])

  const transformValue = (inputStake, inputDays, label, subscriber) => {
    let stake = Number(inputStake);
    let days = Number(inputDays);
    let rentalLabel = RENTAL_LABEL
    if (label !== RENTAL_LABEL) {
        const existingUser = existingUsers.find(user => user.account===subscriber.account)
        if (readOnlySubscriber[subscriber.account] === RENEW_LABEL) {
            stake = Number(stake - existingUser.stake)
            rentalLabel = ADD_STAKE_LABEL
        } else {
            const existingDay = calculateNumberOfDays(new Date().getTime(), existingUser.renewal);
            days = Math.ceil(days - Math.round(existingDay))
            rentalLabel = RENEW_LABEL
        }
    }
    return { stake, days, rentalLabel };
  }

  const renderTableRow = (data, label) => {
    const tableRow = data.map((datum, index) => {
      const {stake, days, rentalLabel} = transformValue(Number(extraStake[datum.account]), Math.round(Number(extraDays[datum.account])), label, datum)
      return (
        <TableRow key={index}>
          <TableCell>{datum.account}</TableCell>
          <TableCell className='waxFldBx'>
            <TextField
              id="standard-basic stake"
              variant="standard"
              key={extraStake[datum.account]}
              defaultValue={extraStake[datum.account]}
              onBlur={(event) => {
                const readOnlySubscriberData = {
                  ...readOnlySubscriber,
                  [datum.account]: RENEW_LABEL
                };
                const extraStakeData = {
                  ...extraStake,
                  [datum.account]: event.target.value
                };
                setExtraStake({...extraStakeData});
                setReadOnlySubscriber({...readOnlySubscriberData});
              }}
              disabled={!!(readOnlySubscriber[datum.account] === ADD_STAKE_LABEL && userType === USER_TYPE.EXISTING_USER)}
              // InputProps={{
              //   readOnly: !!(readOnlySubscriber[datum.account] === 'stake' && userType === USER_TYPE.EXISTING_USER),
              // }}
            />
          </TableCell>
          <TableCell className='waxFldBx'>
            <TextField
              id="standard-basic renewal"
              variant="standard"
              key={extraDays[datum.account]}
              defaultValue={extraDays[datum.account]}
              onBlur={(event) => {
                const readOnlySubscriberData = {
                  ...readOnlySubscriber,
                  [datum.account]: ADD_STAKE_LABEL
                };
                const extraDaysData = {
                  ...extraDays,
                  [datum.account]: event.target.value
                };
                setReadOnlySubscriber({...readOnlySubscriberData});
                setExtraDays({...extraDaysData});
              }}
              disabled={!!(readOnlySubscriber[datum.account] === RENEW_LABEL && userType === USER_TYPE.EXISTING_USER)}
              // InputProps={{
              //   readOnly: !!(readOnlySubscriber[datum.account] === 'renewal' && userType === USER_TYPE.EXISTING_USER),
              // }}
            />
          </TableCell>
          <TableCell className='tableactBx'>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                // handleOpen(datum);
                handleRental(datum.account, stake, days, rentalLabel)
              }}
            >
              {console.log(':: datum.account ', datum.account)}
              {Rental.rentalCharges(stake, days, rentalPrice, !!(rentalLabel === RENEW_LABEL)).toFixed(3) + " WAX"}
            </Button>
            <Button
              className='editaccModal'
              onClick={() => {
                deleteFromCache([datum.account])
              }}
            >
              <CloseIcon />
            </Button>
            {/* <EditAccountModal
              subscriber={subscriber}
              vipDiscount={vipDiscount}
              rentalPrice={rentalPrice}
              handleClose={() => {
                handleClose();
              }}
            /> */}
          </TableCell>
        </TableRow>
      );
    })
    return <>{tableRow}</>;
  };

  return (
    <TableContainer className='advtableOuter' component={Paper}>
      <div className='tablesrch'>
        <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={userType}
              onBlur={(event) => {
                setUserType(event.target.value);
                setUserFilter(event.target.value)
              }}
            >
              <MenuItem value={USER_TYPE.EXISTING_USER}>Existing User</MenuItem>
              <MenuItem value={USER_TYPE.NEW_USER}>New User</MenuItem>
            </Select>
        </FormControl>
      </div>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className='tablesrch'>
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell>Stake(WAX)</TableCell>
            <TableCell>Days</TableCell>
            <TableCell width="160">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell colSpan='4'></TableCell>
            </TableRow>
            {userType === USER_TYPE.EXISTING_USER ? renderTableRow(existingUsers, null ) : renderTableRow(newUsers,RENTAL_LABEL)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}