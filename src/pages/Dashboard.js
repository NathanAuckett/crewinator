import "../components/Item.css"

import { useContext, useEffect, useState} from 'react';
import {LoginContext} from "../components/LoginContext";
import {useNavigate} from 'react-router-dom'

import Grid from '@mui/material/Unstable_Grid2';

import { MenuBar } from '../components/MenuBar/MenuBar';
import { Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Dashboard() {
    const {loggedIn} = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn){
            console.log("not logged in");
            navigate("/");
        }
    }, []);

    return (
        <Grid container direction="row">
            <MenuBar/>
            
            <Outlet/>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
            />
        </Grid>
    )

}