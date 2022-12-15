import { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {LoginContext} from "../components/LoginContext";

import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function NewFriend() {
    const {loginInfo} = useContext(LoginContext);
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");

    async function submitRequest(){
        const json = JSON.stringify({"email": email, 'user_id': loginInfo.id});
            
        const response = await fetch("/friends/create", {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: json
        });
        
        const data = await response.json();

        console.log(data);
        //navigate("/dashboard/games");
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
                        <h2>Add Friend</h2>
                    </Grid>
                    <Grid width={"80%"}>
                        <TextField fullWidth variant="standard" label="User email" onChange={(e) => {setEmail(e.target.value)}}/>
                    </Grid>
                    <Grid>
                        <Button variant="contained" onClick={submitRequest}>Send Request</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )

}