import React from 'react';
import {LoginContext} from "./LoginContext";
import {useNavigate} from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';

export function LoginSignupField(props) {
    const navigate = useNavigate();
    const {setLoggedIn, setLoginInfo} = React.useContext(LoginContext);

    const [signingUp, setSigningUp] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleClickShowPassword(){
        setShowPassword((showPassword) => !showPassword);
    }

    function toggleSigningUp(){
        setSigningUp(!signingUp);
    }

    async function login(){
        const json = JSON.stringify({"email": email, "password": password});
        
        const response = await fetch("/users/authenticate", {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: json
        });
        
        const data = await response.json();

        console.log(data);

        if (data.result === 200){
            const userInfo = data.data;
            setLoggedIn(true);
            console.log(userInfo);
            setLoginInfo(userInfo);
            navigate("/dashboard");
        }
    }


    async function signup(){
        if (password === confirmPassword){
            const json = JSON.stringify({"email": email, "username": username, "password": password});
            
            const response = await fetch("/users/create", {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: json
            });
            
            const data = await response.json();

            if (data.result === 200){
                setLoggedIn(true);
                navigate("/dashboard");
            }
        }
        else{
            console.log("Passwords don't match!");
        }
    }


    return (
        <div>
            <Paper elevation={15} sx={{width: "400px"}}>
                <Grid container rowSpacing={2} direction="column" alignItems="center">
                    <Grid>
                        {signingUp ?
                            <h2>Sign Up</h2>
                        :
                            <h2>Login</h2>
                        }
                    </Grid>
                    <Grid>
                        <TextField variant="standard" sx={{ m: 1, width: '20ch' }} label="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                    </Grid>
                    {signingUp ? 
                        <Grid>
                            <TextField variant="standard" label="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                        </Grid>
                        : null
                    }
                    <Grid>
                        <FormControl sx={{ m: 1, width: '20ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => {setPassword(e.target.value)}}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    {signingUp ? 
                        <Grid>
                            <TextField variant="standard" label="Confirm Password" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                        </Grid>
                        : null
                    }
                    <Grid margin={4}>
                        <Grid container columnSpacing={4}>
                            <Grid>
                                {signingUp ?
                                    <Button
                                        variant="text"
                                        style={{color: "black"}}
                                        onClick={toggleSigningUp}
                                    >Login</Button>
                                :
                                    <Button
                                        variant="text"
                                        style={{color: "black"}}
                                        onClick={toggleSigningUp}
                                    >Sign up</Button>
                                }
                                
                            </Grid>
                            <Grid>
                                {signingUp ?
                                    <Button variant="contained" onClick={signup}>Sign up</Button>
                                :
                                    <Button variant="contained" onClick={login}>Login</Button>
                                }
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}