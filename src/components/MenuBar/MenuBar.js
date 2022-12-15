import { useState, useContext, useEffect } from 'react';
import {LoginContext} from "../LoginContext";

import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';

import PeopleIcon from '@mui/icons-material/People';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import EventIcon from '@mui/icons-material/Event';

import { Link, useLocation} from 'react-router-dom';

import { NewButton } from './NewButton';
import { NotificationPanel } from '../Notifications/NotificationPanel/NotificationPanel';
import { Notification, friendRequestAccept, eventRequestAccept } from '../Notifications/Notification';


export function MenuBar(){
    const {loginInfo} = useContext(LoginContext);
    const location = useLocation();
    const path = location.pathname;

    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);

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
            <Grid xs={9}>
                <NewButton/>
            </Grid>
            <Grid xs={1}>
                User ID: {loginInfo.user_id}
            </Grid>
            <Grid xs={2} display="flex" justifyContent="right">
                {path !== "/dashboard" ? 
                    <Link to=""><Button><EventIcon fontSize='large'/></Button></Link> : null
                }
                {path !== "/dashboard/library" ? 
                    <Link to="library"><Button><VideogameAssetIcon fontSize='large'/></Button></Link> : null
                }
                {path !== "/dashboard/friends" ? 
                    <Link to="friends"><Button><PeopleIcon fontSize='large'/></Button></Link> : null
                }
                <Button onClick={() => {setShowNotifications(!showNotifications)}}><NotificationsNoneIcon fontSize='large'/></Button>
            </Grid>
            {showNotifications? 
                <NotificationPanel notifications={notifications}/> : null
            }
        </Grid>
        
    )
}