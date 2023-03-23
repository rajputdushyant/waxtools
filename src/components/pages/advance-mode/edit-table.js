import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { calculateNumberOfDays } from '../../../global/helper';
import { Rental } from '../../../global/cpu_rental/rental';


export default function DenseTable({
  subscriber,
  vipDiscount,
  rentalPrice
}) {
  const intialExtraDays = subscriber.renewal
    ? calculateNumberOfDays(new Date().getTime(), subscriber.renewal)
    : null;
  const intialExtraStaks = subscriber.stake ? subscriber.stake.toFixed(2) : null;
  const [extraDays, setExtraDays] = useState(intialExtraDays)
  const [extraStake, setExtraStake] = useState(intialExtraStaks)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell>Puchase</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>John Smith</TableCell>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  defaultValue={extraStake}
                  onChange={(event) => {
                    setExtraStake(event.target.value);
                  }}
                /> WAX &nbsp; &nbsp;
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder='7'
                  defaultValue={extraDays}
                  onChange={(event) => {
                    setExtraDays(event.target.value);
                  }}
                /> Days
              </TableCell>
              <TableCell width="100">
                  <Button className='addbutton'>
                    Pay {Rental.rentalCharges(extraStake, extraDays, rentalPrice, true, vipDiscount).toFixed(3)} WAX
                  </Button>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}