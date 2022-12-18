import './NotificationListItem'

import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material";

import { ThumbnailImage } from '../../ThumbnailImage/ThumbnailImage'

export function NotificationListItem(props){
    const title = props.title;
    const description = props.description;
    const accept = props.accept;
    const decline = props.decline;
    const thumbnailURL = props.thumbnailURL || "https://media3.giphy.com/media/CNAhQuDceLwwo/giphy.gif";
    
    //console.log(title);

    return (
        <Grid xs={12}>
            <Paper variant="outlined">
                <Grid container spacing={1}>
                    <Grid>
                        <Box className="ItemPreviewImage">
                            {/* <img height="100%" alt="Game image" src={thumbnailURL}/> */}
                            <ThumbnailImage thumbnailURL={thumbnailURL} size={'8rem'}/>
                        </Box>
                    </Grid>
                    <Grid container direction='column'>
                        <Grid>
                            <h3 style={{marginBottom: '0.1rem'}}>{title}</h3>
                            <p style={{marginTop: '0.1rem', marginBottom: '0.1rem'}}>{description}</p>
                        </Grid>
                        <Grid>
                            <Button style={{marginRight: '1rem'}} variant='outlined' onClick={() => {accept.callback()}}>{accept.text}</Button>
                            <Button variant='outlined' onClick={() => {decline.callback()}}>{decline.text}</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}
