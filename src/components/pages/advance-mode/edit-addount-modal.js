import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {FiEdit} from "react-icons/fi";
import EditTable from './edit-table'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function BasicModal({
  subscriber,
  handleClose,
  vipDiscount,
  rentalPrice
}) {
  return (
    <div>
      <Button className='editaccModal'><MoreVertIcon /></Button>
      <Modal
        open={!!subscriber?.account}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="editmodalBx_Outer">
        <Box sx={style}>
            <div className='modalTable'>
                <EditTable
                  subscriber={subscriber}
                  vipDiscount={vipDiscount}
                  rentalPrice={rentalPrice}
                />
            </div>
        </Box>
      </Modal>
    </div>
  );
}