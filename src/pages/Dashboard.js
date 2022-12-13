import "../components/Item.css"

import { useContext, useEffect } from 'react';
import {LoginContext} from "../components/LoginContext";
import {useNavigate} from 'react-router-dom'

import Grid from '@mui/material/Unstable_Grid2';

// import { EventList } from '../components/EventList';
// import { EventCalendar } from '../components/EventCalendar';
import { MenuBar } from '../components/MenuBar';
import { Outlet } from 'react-router-dom';

export function Dashboard() {
    const navigate = useNavigate();
    const {loggedIn, loginInfo} = useContext(LoginContext);

    console.log(loginInfo);

    useEffect(() => {
        // if (!loggedIn){
        //     console.log("not logged in");
        //     navigate("/");
        // }
    }, []);
    

    return (
        <Grid container direction="row">
            <p>Hello, {loginInfo.username}</p>
            <MenuBar/>
            
            <Outlet/>
        </Grid>
    )

}