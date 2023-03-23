import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { UALProvider, withUAL } from 'ual-reactjs-renderer'
import { Wax } from '@eosdacio/ual-wax'
import { Anchor } from "ual-anchor";
import { createTheme } from '@mui/material/styles';
import {ThemeProvider} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from "@mui/material/Box";

export const themeOptions = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#13031c',
        },
        secondary: {
            main: '#a7761f',
            contrastText: '#c490f3',
            light: '#cbcbcb',

        },
        background: {
            default: '#1A0C23',
            paper: 'rgba(29,3,47,0.4)',
        },
        text: {
            primary: 'rgba(255,255,255,1)',
            disabled: 'rgba(255,255,255,0.32)',
        },
        flex:{
            display:'flex'
        },
        large:{
            height: '45px',
        }
        
    },
    components: {
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(29,3,47,0.4)',
                    border: '1px solid #c490f3'
                },
            },
        },
        MuiGrid: {
            styleOverrides: {
                root: {
                    padding: '5px',
                },
            },
        },
    },
});



//TODO make this better
const myChain = {
  chainId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
  rpcEndpoints: [{
      protocol: "https",
      host: "api.wax.alohaeos.com",
      port: "",
  }]
}
const lWax = new Wax([myChain], { appName: 'waxptools' })
const lAnchor = new Anchor([myChain], { appName: 'waxptools' })
const MyUALConsumer = withUAL(App);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <UALProvider chains={[myChain]} authenticators={[lWax, lAnchor]} appName={'waxptools'}>
          <ThemeProvider theme={themeOptions}>
              <Box backgroundColor= 'primary.main index'>
                  <MyUALConsumer />
              </Box>

          </ThemeProvider>
      </UALProvider>
    </BrowserRouter>
    
  </React.StrictMode>
);
