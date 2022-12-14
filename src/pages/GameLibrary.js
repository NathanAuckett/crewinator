
import { useState, useEffect, useContext} from "react";
import {LoginContext} from "../components/LoginContext";

import axios from 'axios';

import Grid from '@mui/material/Grid'

import { GameListItem } from '../components/GameListItem'

export function GameLibrary(){
    const {loginInfo} = useContext(LoginContext);
    const [games, setGames] = useState([]);

    async function fetchGames(){
        const response = await axios.get('/game-users/from-user-id?user_id=' + loginInfo.user_id);
        console.log(response);

        setGames(response.data);
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
                return <GameListItem key={e.id} id={e.id} title={e.title} desc={e.description} thumbnailURL={e.image_url}/>
            })}
        </Grid>
    )
}