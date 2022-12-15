import './NotificationPanel.css'

import Grid from '@mui/material/Grid'

import {NotificationListItem} from '../NotificationListItem'


export function NotificationPanel(props){
    const notifications = props.notifications;

    //console.log(notifications);
    
    return (
        <div className='NotificationPanel'>
            <Grid container zIndex={-999}>
                {notifications.map((e) => {
                    return <NotificationListItem key={e.id} title={e.title} description={e.description} thumbnailURL={e.thumbnailURL} accept={e.accept}/>
                })}
            </Grid>
        </div>
    )
}