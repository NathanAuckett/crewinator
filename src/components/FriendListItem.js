
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Checkbox from '@mui/material/Checkbox';

export function FriendListItem(props){
    const friend = props.friend;
    const selectionMap = props.selectionMap;

    return (
        <Grid xs={12}>
            <Paper variant="outlined">
                <Grid container spacing={2}>
                    <Grid>
                        <Box className="ItemPreviewImage">
                            <img height="100%" alt="Game image" src="https://media3.giphy.com/media/CNAhQuDceLwwo/giphy.gif"/>
                        </Box>
                    </Grid>
                    <Grid display='flex'>
                        <Grid container direction='column' justifyContent='center'>
                            <h3>{friend.username}</h3>
                        </Grid>
                    </Grid>
                    {selectionMap ? 
                        <Grid display="flex" justifyContent='right' xs={true}>
                            <Grid container direction='column' justifyContent='center'>
                                <Checkbox onClick={(e) => {
                                    if (e.target.checked){
                                        selectionMap.set(friend.user_id, friend);
                                    }
                                    else{
                                        selectionMap.delete(friend.user_id);
                                    }
                                }}/>
                            </Grid>
                        </Grid>
                    : null
                    }
                </Grid>
            </Paper>
        </Grid>
    )
}