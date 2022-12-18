import { useState, useContext, useEffect } from 'react';
import {LoginContext} from "../LoginContext";
import {useNavigate} from 'react-router-dom';

import axios from 'axios';

import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';

import PeopleIcon from '@mui/icons-material/People';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideoGameAssetIcon from '@mui/icons-material/VideogameAsset';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link, useLocation} from 'react-router-dom';

import { NewButton } from './NewButton';
import { NotificationPanel } from '../Notifications/NotificationPanel/NotificationPanel';
import { Notification, friendRequestAccept, eventRequestAccept } from '../Notifications/Notification';


export function MenuBar(){
    const navigate = useNavigate();
    const {loginInfo} = useContext(LoginContext);
    const location = useLocation();
    const path = location.pathname;

    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);

    async function logout(){
        const response = await axios.post("/users/logout");

        if (response.status === 200){
            navigate("/");
        }
    }

    async function fetchNotifications(){
        const tempNotifications = [];
        
        //Get pending friends
        let response = await fetch("/friends/pending-from-user-id?user_id=" + loginInfo.user_id);
        let data = await response.json();
        console.log("Notifications");
        console.log(data);
        for (let request of data.data){
            tempNotifications.push(new Notification("Friend Request", `${request.username} wants to be your friend!`, friendRequestAccept(request.friend_id)));
        }

        // Get pending events
        response = await fetch("/event-invites/get-pending_by_user_id?user_id=" + loginInfo.user_id);
        data = await response.json();
        console.log("Events");
        console.log(data);
        for (let request of data.data){
            tempNotifications.push(new Notification("Event Invitation", `You're invited to ${request.title}`, request.image_url, eventRequestAccept(request.event_invite_id)));
        }

        setNotifications(tempNotifications);
    }

    useEffect(() => {
        fetchNotifications();
    }, [path]);

    return(
        <Grid container direction="row" xs={12} position='relative'>
            <Grid xs={10}>
                <NewButton/>
            </Grid>
            <Grid xs={2} display="flex" justifyContent="right">
                {path !== "/dashboard" ? 
                    <Link to=""><IconButton><EventIcon fontSize='large'/></IconButton></Link> : null
                }
                {path !== "/dashboard/library" ? 
                    <Link to="library"><IconButton><VideoGameAssetIcon fontSize='large'/></IconButton></Link> : null
                }
                {path !== "/dashboard/friends" ? 
                    <Link to="friends"><IconButton><PeopleIcon fontSize='large'/></IconButton></Link> : null
                }
                <IconButton onClick={() => {setShowNotifications(!showNotifications)}}><NotificationsNoneIcon fontSize='large'/></IconButton>
                <IconButton aria-label='Logout' onClick={() => {logout()}}><LogoutIcon fontSize='large'/></IconButton>
            </Grid>
            {showNotifications? 
                <NotificationPanel notifications={notifications}/> : null
            }
        </Grid>
        
    )
}