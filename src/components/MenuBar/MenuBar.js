import { useState, useContext, useEffect } from 'react';
import {LoginContext} from "../LoginContext";
import {useNavigate} from 'react-router-dom';

import axios from 'axios';

import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import PeopleIcon from '@mui/icons-material/People';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideoGameAssetIcon from '@mui/icons-material/VideogameAsset';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link, useLocation} from 'react-router-dom';

import { NewButton } from './NewButton';
import { NotificationPanel } from '../Notifications/NotificationPanel/NotificationPanel';
import { Notification, friendRequestAccept, friendRequestDecline, eventRequestAccept, eventRequestDecline} from '../Notifications/Notification';


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
        let response = await axios.get("/friends/pending-from-user-id?user_id=" + loginInfo.user_id);
        console.log("Notifications");
        console.log(response.data);
        for (let request of response.data){
            console.log(request);
            tempNotifications.push(new Notification("Friend Request", `${request.username} wants to be your friend!`, null, friendRequestAccept(request.friend_id, setShowNotifications), friendRequestDecline(request.friend_id), setShowNotifications));
        }

        // Get pending events
        response = await axios.get("/event-invites/get-pending_by_user_id?user_id=" + loginInfo.user_id);

        console.log("Events");
        console.log(response.data);
        for (let request of response.data){
            tempNotifications.push(new Notification("Event Invitation", `You're invited to ${request.title}`, request.image_url, eventRequestAccept(request.event_invite_id, setShowNotifications), eventRequestDecline(request.event_invite_id), setShowNotifications));
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
                    <Tooltip title="Events" arrow>
                        <Link to=""><IconButton><EventIcon fontSize='large'/></IconButton></Link>
                    </Tooltip>
                    : null
                }
                {path !== "/dashboard/library" ? 
                    <Tooltip title="Game Library" arrow>
                        <Link to="library"><IconButton><VideoGameAssetIcon fontSize='large'/></IconButton></Link>
                    </Tooltip>
                    : null
                }
                {path !== "/dashboard/friends" ?
                    <Tooltip title="Friends" arrow>
                        <Link to="friends"><IconButton><PeopleIcon fontSize='large'/></IconButton></Link>
                    </Tooltip>
                    : null
                }
                <Tooltip title="Notifications" arrow>
                    <IconButton onClick={() => {setShowNotifications(!showNotifications)}}><NotificationsNoneIcon fontSize='large'/></IconButton>
                </Tooltip>
                <Tooltip title="Logout" arrow>
                    <IconButton aria-label='Logout' onClick={() => {logout()}}><LogoutIcon fontSize='large'/></IconButton>
                </Tooltip>
            </Grid>
            {showNotifications? 
                <NotificationPanel notifications={notifications}/> : null
            }
        </Grid>
        
    )
}