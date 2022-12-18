import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';

import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { toast } from 'react-toastify';

import { ThumbnailImage } from '../components/ThumbnailImage/ThumbnailImage'

export function NewGame() {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState("");
    const [imageURL, setImageURL] = useState("");

    async function submitGame(){
        const response = await axios.post("/games/create", {
            "title": title,
            "image_url": imageURL
        });

        if (response.status === 200){
            toast(`New game, ${title}, created!`);
            navigate("/dashboard/games");
        }
    }

    return (
        <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80%"
            width={"100%"}
        >
            
            <Paper elevation={15} sx={{width: "400px"}}>
                <Grid container rowSpacing={2} direction="column" alignItems="center" m={1}>
                    <Grid>
                        <h2>Add Game</h2>
                    </Grid>
                    <Grid width={"80%"}>
                        <TextField fullWidth variant="standard" label="Game Title" onChange={(e) => {setTitle(e.target.value)}}/>
                    </Grid>
                    
                    <Grid width={"80%"} textAlign="center">
                        <TextField fullWidth variant="standard" label="Game Thumbnail Image URL" onChange={(e) => {setImageURL(e.target.value)}}/>
                    </Grid>

                    <Grid>
                        {imageURL === '' ?
                            <Box style={{borderStyle: 'solid', borderWidth: '1px', width: '7rem', height: '7rem'}}/>
                        :
                            <Box className="ItemPreviewImage">
                                <ThumbnailImage thumbnailURL={imageURL} size={'7rem'}/>
                            </Box>
                        }
                    </Grid>

                    <Grid>
                        <Button variant="contained" onClick={submitGame}>Add Game</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )

}