import React, {useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import {Loader} from "../components/common-components/loader/loader";
import './router.scss'
import {createURL} from "../global/helper";
import {ROUTES} from "../global/constant";


const Redirect = ({loc}) => {
    const params = useParams();
    const {wallet} = params;
    const navigate = useNavigate()

    useEffect(() => {
        if (loc === '/') {
            const url = createURL(ROUTES.HOME,{}, {ref: wallet});
            navigate(url);
        } else {
            window.location.href = loc;
        }

    }, []);

    return (
        <Loader isLoading={true}/>
    )

}

export default Redirect;