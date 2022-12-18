import { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {LoginContext} from "../components/LoginContext";

import axios from 'axios';

import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { toast } from 'react-toastify';

export function NewFriend() {
    const {loginInfo} = useContext(LoginContext);
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    function validateEmail(){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setEmailError(false);
            return true;
        }
        setEmailError(true);
        return false
    }

    async function submitRequest(){
        if (validateEmail()){
            // const json = JSON.stringify({"email": email, 'user_id': loginInfo.user_id});
            // console.log(json);
            

            // const response = await fetch("/friends/create", {
            //     method: 'POST',
            //     headers: {
            //         'Accept': '*/*',
            //         'Content-Type': 'application/json'
            //     },
            //     body: json
            // });

            try {
                const response = await axios.post('/friends/create', {
                    "email": email,
                    'user_id': loginInfo.user_id
                });
                console.log(response.data);

                toast(`Friend request sent!`);
                navigate("/dashboard/friends");
            }
            catch (err){
                console.log(err);
                toast.error(`Error: ${err.response.data}`);
            }
            
            

            // if (response.status === 200){
            //     toast(`Friend request sent!`);
            //     navigate("/dashboard/friends");
            // }
            // else{
            //     toast.error(`Error: ${response.data}`);
            // }
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
                        <h2>Add Friend</h2>
                    </Grid>
                    <Grid width={"80%"}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="User email"
                            onChange={(e) => {setEmail(e.target.value)}}
                            onBlur={()=>{validateEmail()}}
                            error = {emailError}
                            helperText = {emailError? "Invalid email!" : null}
                        />
                    </Grid>
                    <Grid>
                        <Button variant="contained" onClick={submitRequest}>Send Request</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )

}