import { useState, useContext } from 'react';
import {LoginContext} from "../components/LoginContext";
import {useNavigate} from 'react-router-dom';

import axios from 'axios';

import dayjs from 'dayjs';

import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { FriendList } from '../components/FriendList';
import { ThumbnailImage } from '../components/ThumbnailImage/ThumbnailImage';

import { toast } from 'react-toastify';

export function NewEvent() {
    //Send event first
    const {loginInfo} = useContext(LoginContext);
    const navigate = useNavigate();
    
    const [title, setTitle] = useState("");
    const [dateTime, setDateTime] = useState(dayjs());
    const [imageURL, setImageURL] = useState('');
    const [selectedFriendMap] = useState(new Map());

    async function submitEvent(){
        console.log("Submitting event:");

        let friends = [];
        if (selectedFriendMap.size > 0){
            const entries = selectedFriendMap.values();
            for (let friend of entries){
                friends.push(friend);
            }
        }

        let response = await axios.post("/events/create", {
            "title": title,
            "start_date_time": dateTime.toISOString().replace('T', ' ').replace('Z', ''),
            "image_url": imageURL,
            'creator_user_id': loginInfo.user_id,
            "friends": friends
        });

        if (response.status === 200){
            toast(`Event, ${title}, created!`);
            navigate("/dashboard");
        }
        else{
            toast.error(`Error creating event! ${response.data}`);
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
            
            <Grid xs={8} lg={4}>
                <Paper elevation={15}>
                    <Grid container rowSpacing={2} direction="column" alignItems="center" m={1}>
                        <Grid>
                            <h2>New Event</h2>
                        </Grid>
                        <Grid width={"80%"}>
                            <TextField fullWidth variant="standard" label="Event Title" onChange={(e) => {setTitle(e.target.value)}}/>
                        </Grid>
                        <Grid>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Grid container columnSpacing={2} textAlign="center">
                                    <Grid>
                                        <h3>Start time</h3>
                                        <DateTimePicker
                                            label="Start time"
                                            value={dateTime}
                                            onChange={(value) => {setDateTime(value)}}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                </Grid>
                            </LocalizationProvider>
                        </Grid>
                        <Grid width={'100%'} textAlign="center">
                            <h3>Invite friends</h3>
                            <div style={{height: '200px', overflowY: 'scroll', overflowX: 'hidden'}}>
                                <FriendList selectionMap={selectedFriendMap}/>
                            </div>
                        </Grid>
                        <Grid width={"80%"} textAlign="center">
                            <TextField fullWidth variant="standard" label="Event Thumbnail Image URL" onChange={(e) => {setImageURL(e.target.value)}}/>
                        </Grid>
                        <Grid>
                            {imageURL === '' ?
                                <Box style={{borderStyle: 'solid', borderWidth: '1px', width: '7rem', height: '7rem'}}/>
                            :
                                <Box className="ItemPreviewImage">
                                    {/* <img height="100%" alt="Event Thumbnail" src={imageURL}/> */}
                                    <ThumbnailImage thumbnailURL={imageURL} size={'7rem'}/>
                                </Box>
                            }
                        </Grid>
                        <Grid>
                            <Button variant="contained" onClick={submitEvent}>Create Event</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}