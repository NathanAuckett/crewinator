
import { useState, useEffect } from "react";

import Grid from '@mui/material/Grid'

import { GameListItem } from '../components/GameListItem'

export function GameLibrary(){
    const [games, setGames] = useState([]);

    async function fetchGames(){
        const response = await fetch("http://127.0.0.1:4000/games");
        const data = await response.json();
        
        console.log(data);

        setGames(data.data);
    }

    useEffect(() => {
        fetchGames();
    }, []);
    
    return (
        <Grid container direction="column" display="flex" alignContent="center" style={{width: "100%"}}>
            <Grid textAlign="center">
                <h2>Games</h2>
            </Grid>
            {games.map((e) => {
                return <GameListItem key={e.id} title={e.title} desc={e.description} thumbnailURL={e.image_url}/>
            })}
        </Grid>
    )
}