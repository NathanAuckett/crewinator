import { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';

import PeopleIcon from '@mui/icons-material/People';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import EventIcon from '@mui/icons-material/Event';

import { Link, useLocation} from 'react-router-dom';


function NewButton(props){
    let button;

    switch (props.path){
        case "/dashboard/library":
            button = <Link to="games"><Button variant="contained" style={{marginLeft: "1rem"}}>Add Game</Button></Link>;
            break;
        case "/dashboard/games":
            button = <Link to="new-game"><Button variant="contained" style={{marginLeft: "1rem"}}>New Game</Button></Link>;
            break;
        case "/dashboard/friends":
            button = <Link to="new-friend"><Button variant="contained" style={{marginLeft: "1rem"}}>Add Friend</Button></Link>;
            break;
        case "/dashboard":
            button = <Link to="new-event"><Button variant="contained" style={{marginLeft: "1rem"}}>New Event</Button></Link>
            break;
        default: button = null;
    }

    return button;
}


export function MenuBar(props){
    const location = useLocation();
    const path = location.pathname;

    return(
        <Grid container direction="row" xs={12}>
            <Grid xs={10}>
                <NewButton path={path}/>
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
                <Button><NotificationsNoneIcon fontSize='large'/></Button>
            </Grid>
        </Grid>
        
    )
}