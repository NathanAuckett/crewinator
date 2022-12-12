import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export function EventListItem(props){
    const dateStr = props.date.format('DD/MM/YY');
    const timeStr = props.date.format('HH:mm:A');
    const thumbnailImage = props.thumbnailURL || "https://media3.giphy.com/media/CNAhQuDceLwwo/giphy.gif";
    
    return (
        <Grid>
            <Paper variant="outlined" className="LiftOnHover">
                <Grid container spacing={1}>
                    <Grid>
                        <Box className="ItemPreviewImage">
                            <img alt="Game image" src={thumbnailImage}/>
                        </Box>
                    </Grid>
                    <Grid>
                        <h3 style={{marginTop: '0.5rem', marginBottom: '0.5rem'}}>{props.title}</h3>
                        <p style={{marginTop: '0.5rem', marginBottom: '0.5rem'}}>Date: {dateStr}<br/>Time: {timeStr}</p>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}