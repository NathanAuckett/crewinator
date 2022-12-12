
import Grid from '@mui/material/Grid'

import { GameListItem } from '../components/GameListItem'

export function GameLibrary(){
    return (
        <Grid container direction="column" display="flex" alignContent="center" style={{width: "100%"}}>
            <Grid textAlign="center">
                <h2>Games</h2>
            </Grid>
            
            <GameListItem/>
            <GameListItem/>
            <GameListItem/>
            <GameListItem/>
            <GameListItem/>
            <GameListItem/>
            <GameListItem/>
            <GameListItem/>
            <GameListItem/>
            <GameListItem/>
            
        </Grid>
    )
}