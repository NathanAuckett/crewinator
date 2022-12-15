
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material";

export function NotificationListItem(props){
    const title = props.title;
    const description = props.description;
    const accept = props.accept;
    const thumbnailURLs = props.thumbnailURL || "https://media3.giphy.com/media/CNAhQuDceLwwo/giphy.gif";
    
    //console.log(title);

    return (
        <Grid xs={12}>
            <Paper variant="outlined">
                <Grid container spacing={1}>
                    <Grid>
                        <Box className="ItemPreviewImage">
                            <img height="100%" alt="Game image" src={thumbnailURLs}/>
                        </Box>
                    </Grid>
                    <Grid>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </Grid>
                    <Grid>
                        <Button onClick={() => {accept.callback()}}>{accept.text}</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}
