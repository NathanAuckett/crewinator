import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

import dayjs from 'dayjs';

import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export function NewEvent() {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState("");
    const [dateTime, setDateTime] = useState(dayjs());
    const [imageURL, setImageURL] = useState('');

    async function submitEvent(){
        console.log(dateTime);
        console.log(dateTime.toISOString());
        const json = JSON.stringify({"title": title, "start_date_time": dateTime.toISOString().replace('T', ' ').replace('Z', ''), "image_url": imageURL, "creator_id": "1"});
            
        const response = await fetch("/events/create", {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: json
        });
        
        const data = await response.json();

        console.log(data);
        navigate("/dashboard");
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
                    <Grid width={"80%"} textAlign="center">
                        <TextField fullWidth variant="standard" label="Event Thumbnail Image URL" onChange={(e) => {setImageURL(e.target.value)}}/>
                    </Grid>
                    <Grid>
                        {imageURL === '' ?
                            <Box className="ItemPreviewImage" style={{borderStyle: 'solid', borderWidth: '1px'}}/>
                        :
                            <Box className="ItemPreviewImage">
                                <img height="100%" alt="Event Thumbnail" src={imageURL}/>
                            </Box>
                        }
                    </Grid>
                    <Grid>
                        <Button variant="contained" onClick={submitEvent}>Create Event</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )

}