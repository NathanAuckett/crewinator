import { useContext} from 'react';
import {LoginContext} from "../components/LoginContext";

import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from '@mui/material';

import { toast } from 'react-toastify';

import { ThumbnailImage } from './ThumbnailImage/ThumbnailImage'

export function GameListItem(props){
    const {loginInfo} = useContext(LoginContext);

    const game_id = props.game_id;
    const title = props.title;
    const thumbnailImage = props.thumbnailURL || "https://media3.giphy.com/media/CNAhQuDceLwwo/giphy.gif";
    const canAddToLibrary = props.canAddToLibrary || false;
    
    async function addToLibrary(){
        const json = JSON.stringify({'user_id': loginInfo.user_id, 'game_id': game_id});
        
        const response = await fetch("/game-users/create", {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: json
        });
        
        const data = await response.json();

        if (response.status === 200){
            toast(`${title} added to game library!`);
        }
        console.log(data);
    }

    return (
        <Grid xs={5}>
            <Paper variant="outlined">
                <Grid container spacing={1}>
                    <Grid>
                        <Box className="ItemPreviewImage">
                            {/* <img height="100%" alt="Game image" src={thumbnailImage}/> */}
                            <ThumbnailImage thumbnailURL={thumbnailImage} size={'7rem'}/>
                        </Box>
                    </Grid>
                    <Grid display='flex'>
                        <Grid container direction='column' justifyContent='center'>
                            <h3>{title}</h3>
                        </Grid>
                    </Grid>
                    <Grid xs={true} textAlign='end'>
                        {canAddToLibrary ? <Button onClick={addToLibrary}>Add to Library</Button> : null}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}
