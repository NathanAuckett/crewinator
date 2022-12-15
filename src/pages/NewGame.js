import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function NewGame() {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    //const defaultThumbnail = "https://media3.giphy.com/media/CNAhQuDceLwwo/giphy.gif";

    async function submitGame(){
        const json = JSON.stringify({"title": title, "description": description, "image_url": imageURL});
            
        const response = await fetch("/games/create", {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: json
        });
        
        const data = await response.json();

        console.log(data);
        navigate("/dashboard/games");
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
                    <Grid width={"80%"}>
                        <TextField fullWidth variant="standard" label="Game Description" onChange={(e) => {setDescription(e.target.value)}}/>
                    </Grid>
                    
                    <Grid width={"80%"} textAlign="center">
                        <TextField fullWidth variant="standard" label="Game Thumbnail Image URL" onChange={(e) => {setImageURL(e.target.value)}}/>
                    </Grid>

                    <Grid>
                        {imageURL === '' ?
                            <Box className="ItemPreviewImage" style={{borderStyle: 'solid', borderWidth: '1px'}}/>
                        :
                            <Box className="ItemPreviewImage">
                                <img height="100%" alt="Game Thumbnail" src={imageURL}/>
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