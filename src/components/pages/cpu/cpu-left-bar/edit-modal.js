import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { createURL } from '../../../../global/helper';
import { ROUTES } from '../../../../global/constant';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [walletName, setWalletName] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    const url = createURL(ROUTES.CPU_RENTAL, { wallet:  walletName});
    navigate(url);
    handleClose();
  }
  return (
    <div className='editModalOuter'>
      <Button className='editBtn' onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='editmodalBx' sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Wallet
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className='modalInpBx'>
                    <TextField
                      id="outlined-basic"
                      className='editInp'
                      label="BluedLocker"
                      variant="outlined"
                      onChange={(event) => {
                        setWalletName(event.target.value);
                      }}
                    />
                </div>
                <div className='saveBtnOuter'>
                    <Button
                      onClick={() => { 
                        handleSave();
                      }}
                    >
                      Fetch
                    </Button>
                </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}