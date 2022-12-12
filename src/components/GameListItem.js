
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export function GameListItem(props){
    const title = props.title;
    const desc = props.desc;
    const thumbnailImage = props.thumbnailURL || "https://media3.giphy.com/media/CNAhQuDceLwwo/giphy.gif";
    
    return (
        <Grid xs={5}>
            <Paper variant="outlined" className="LiftOnHover">
                <Grid container spacing={1}>
                    <Grid>
                        <Box className="ItemPreviewImage">
                            <img height="100%" alt="Game image" src={thumbnailImage}/>
                        </Box>
                    </Grid>
                    <Grid>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}
