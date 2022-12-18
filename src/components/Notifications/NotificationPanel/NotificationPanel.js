import './NotificationPanel.css'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';

import {NotificationListItem} from '../NotificationListItem/NotificationListItem'


export function NotificationPanel(props){
    const notifications = props.notifications;
    
    return (
        <Paper elevation={15} className='NotificationPanel'>
            <Grid container>
                {notifications.map((e) => {
                    return <NotificationListItem key={e.id} title={e.title} description={e.description} thumbnailURL={e.thumbnailURL} accept={e.accept} decline={e.decline}/>
                })}
            </Grid>
        </Paper>
    )
}