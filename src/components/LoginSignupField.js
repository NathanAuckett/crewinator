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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LoginSignupField(props) {
    const navigate = useNavigate();
    const {setLoggedIn, setLoginInfo} = useContext(LoginContext);

    const [signingUp, setSigningUp] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function handleClickShowPassword(){
        setShowPassword((showPassword) => !showPassword);
    }

    function toggleSigningUp(){
        setSigningUp(!signingUp);
    }

    async function login(){
        if (validateEmail()){
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
    }

    async function signup(){
        if (validateEmail()){
            if (validatePasswords()){
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
                toast.error("Passwords don't match!");
                console.log("Passwords don't match!");
            }
        }
        else{
            console.log("Invalid email!");
        }
    }

    function validateEmail(){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setEmailError(false);
            return true;
        }
        setEmailError(true);
        return false
    }

    function validatePasswords(){
        if (password === confirmPassword){
            setPasswordError(false);
            return true;
        }
        setPasswordError(true);
        return false;
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
                        <TextField
                            variant="standard"
                            sx={{ m: 1, width: '25ch' }}
                            label="Email"
                            onChange={(e) => {setEmail(e.target.value)}}
                            onBlur={()=>{validateEmail()}}
                            error = {emailError}
                            helperText = {emailError? "Invalid email!" : null}
                        />
                    </Grid>
                    {signingUp ? 
                        <Grid>
                            <TextField variant="standard" sx={{ m: 1, width: '25ch' }} label="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                        </Grid>
                        : null
                    }
                    <Grid>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => {setPassword(e.target.value)}}
                                error = {passwordError}
                                onBlur={signingUp ? ()=>{validatePasswords()} : null}
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
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => {setConfirmPassword(e.target.value)}}
                                    error = {passwordError}
                                    onBlur={()=>{validatePasswords()}}
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
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}