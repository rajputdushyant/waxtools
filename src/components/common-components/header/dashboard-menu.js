import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import dashthumb from '../../../assets/images/wax-logo.png'

export default function BasicMenu({ login, logout, loggedInUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    logout();
  };

  const rednerLoggedInMenu = () => {
    return (
        <>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <i><img src={dashthumb} alt="" /></i>
            {loggedInUser + "  "}  <Button variant="outlined"
                                    color="secondary" onClick={handleClose}> X </Button>
          </Button>

          {/*<Menu*/}
          {/*  id="basic-menu"*/}
          {/*  anchorEl={anchorEl}*/}
          {/*  open={open}*/}
          {/*  MenuListProps={{*/}
          {/*    'aria-labelledby': 'basic-button',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  /!* <MenuItem onClick={handleClose}>Profile</MenuItem>*/}
          {/*  <MenuItem onClick={handleClose}>My account</MenuItem> *!/*/}
          {/*  <MenuItem onClick={handleClose}>Logout</MenuItem>*/}
          {/*</Menu>*/}
        </>
    );
  }

  return (
    <div>
      {!loggedInUser ? (
         <Button variant='outlined' onClick={login} id="basic-button">Login</Button>
      ) : rednerLoggedInMenu()}
    </div>
  );
}