import { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {GameListItem} from '../components/GameListItem'

export function SearchGames() {
    const [title, setTitle] = useState("");
    const [games, setGames] = useState([]);

    async function searchGames(){
        const response = await fetch("/games?" + new URLSearchParams({title: title}));
        
        const data = await response.json();

        console.log(data);
        setGames(data);
    }

    async function getGames(){
        const response = await fetch("/games/");
        
        const data = await response.json();

        console.log(data);
        setGames(data);
    }

    useEffect(() => {
        getGames();
    }, []);

    return (
        <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80%"
            xs={12}
            direction="column"
            textAlign='center'
            rowSpacing={2}
        >
            
            <Grid xs={12}>
                <h2>Games</h2>
            </Grid>
            <Grid xs={6}>
                <TextField fullWidth variant="standard" label="Search Game Title" onChange={(e) => {setTitle(e.target.value)}}/>
            </Grid>
            <Grid xs={12}>
                <Button variant="contained" onClick={searchGames}>Search</Button>
            </Grid>
            {games.map((e) => {
                return <GameListItem key={e.game_id} game_id={e.game_id} title={e.title} desc={e.description} thumbnailURL={e.image_url} canAddToLibrary={true}/>
            })}
        </Grid>
    )

}