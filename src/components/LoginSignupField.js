import { useState, useEffect, useContext } from 'react';
import {LoginContext} from "./LoginContext";
import {useNavigate} from 'react-router-dom';

import axios from 'axios';

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


export function LoginSignupField(props) {
    const navigate = useNavigate();
    const {setLoggedIn, setLoginInfo} = useContext(LoginContext);

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
        const response = await axios.post('/users/authenticate', {
            "email": email,
            "password": password
        });
        
        const data = response.data;

        console.log(data);

        if (response.status === 200){
            setLoggedIn(true);
            setLoginInfo(data);
            navigate("/dashboard");
        }
    }

    async function signup(){
        if (password === confirmPassword){
            const response = await axios.post('/users/create', {
                "email": email,
                "username": username,
                "password": password
            });
            
            const data = response.data;

            console.log("Singup");
            console.log(data);

            if (response.status === 200){
                setLoggedIn(true);
                setLoginInfo(data);
                navigate("/dashboard");
            }
        }
        else{
            console.log("Passwords don't match!");
        }
    }

    async function authenticateToken(){
        const response = await axios.post('/users/authenticate-token');

        if (response.status === 200){
            const data = response.data;
            setLoggedIn(true);
            setLoginInfo(data);
            navigate("/dashboard");
        }
    }

    useEffect(() => {
        authenticateToken();
    }, []);

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
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => {setPassword(e.target.value)}}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
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
                            <FormControl sx={{ m: 1, width: '20ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => {setConfirmPassword(e.target.value)}}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
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