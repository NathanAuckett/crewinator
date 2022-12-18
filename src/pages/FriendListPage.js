import { FreeBreakfast } from '@mui/icons-material';
import Grid from '@mui/material/Grid';

import { FriendList } from '../components/FriendList';

export function FriendListPage(props){
    
    return (
        <Grid container direction="column" display="flex" alignContent="center">
            <Grid textAlign="center">
                <h2>Friends</h2>
            </Grid>
            <Grid width={'50%'}>
                <FriendList/>
            </Grid>
        </Grid>
    )
}