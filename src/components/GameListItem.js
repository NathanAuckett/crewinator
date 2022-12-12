
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export function GameListItem(){
    return (
        <Grid xs={5}>
            <Paper variant="outlined" className="LiftOnHover">
                <Grid container spacing={1}>
                    <Grid>
                        <Box className="ItemPreviewImage">
                            <img height="100%" alt="Game image" src="https://media3.giphy.com/media/CNAhQuDceLwwo/giphy.gif"/>
                        </Box>
                    </Grid>
                    <Grid>
                        <h3>Game Title</h3>
                        <p>Extra text</p>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}
