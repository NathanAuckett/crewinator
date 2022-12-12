
import Grid from '@mui/material/Grid'

import { FriendListItem } from '../components/FriendListItem'

export function FriendList(){
    return (
        <Grid container direction="column" display="flex" alignContent="center" style={{width: "100%"}}>
            <Grid textAlign="center">
                <h2>Friends</h2>
            </Grid>
            
            <FriendListItem/>
            <FriendListItem/>
            <FriendListItem/>
            <FriendListItem/>
            <FriendListItem/>
            
        </Grid>
    )
}