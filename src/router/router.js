import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Header from '../components/common-components/header/header';
import Footer from '../components/common-components/footer/footer';
import Home from '../components/pages/home/home';
import CpuRental from '../components/pages/cpu/cpu'
import AdvanceMode from '../components/pages/advance-mode/advance-mode';
import CompareMode from '../components/pages/compare/compare';
import {ROUTES} from '../global/constant';
import "./router.scss"
import Box from "@mui/material/Box";
import OnOffSwitch from '../components/common-components/onoff-switch';
import Redirect from './redirect';


const Router = ({ual}) => {
    const getLoggedInUser = (ualData) => {
        if (ualData?.activeUser) {
            return ualData?.activeUser?.accountName
        } else return ""
    }
    return (
        <div className="layout">
            <Header ual={ual} loggedInUser={getLoggedInUser(ual)}/>
            {/*<OnOffSwitch />      */}
            <br/>
            <Box sx={{minHeight: '100vh'}}>
                <Routes>
                    <Route exact path={ROUTES.HOME} element={<Home/>}/>
                    <Route exact path={ROUTES.ADVANCE_MODE} element={<AdvanceMode ual={ual} loggedInUser={getLoggedInUser(ual)}/>}/>
                    <Route exact path={ROUTES.CPU_RENTAL}
                           element={<CpuRental ual={ual} loggedInUser={getLoggedInUser(ual)}/>}/>
                    <Route path={ROUTES.REFERRAL_FORM} element={<Redirect loc="https://forms.gle/iuJwRyfE74UfMFZF9"/>}
                           />
                    <Route path={ROUTES.FAQ} element={<Redirect loc="https://drive.google.com/file/d/1o-bGqaepXi3y-3_w8Kn2iL3IY_dPLZdr/view?usp=sharing"/>}
                    />
                    <Route path={ROUTES.REFERRAL} element={<Redirect loc="/"/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                    <Route exact path="/compare" element={<CompareMode/>} />

                </Routes>
            </Box>
            {/*<Footer />*/}
        </div>


    )
}

export default Router