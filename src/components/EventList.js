import dayjs from 'dayjs';

import { useState, useEffect, useContext } from "react";
import {LoginContext} from "./LoginContext";

import Grid from "@mui/material/Unstable_Grid2/Grid2"

import {EventListItem} from "./EventListItem"

export function EventList(props){
    const {loginInfo} = useContext(LoginContext);
    const [events, setEvents] = useState([]);

    async function fetchEvents(){
        const response = await fetch("/events/future?user_id=" + loginInfo.user_id);
        const data = await response.json();
        
        console.log(data);

        for (let event of data.data){
            console.log(event.title);
            console.log(event.start_date_time);
            event.start_date_time = dayjs(event.start_date_time);
            
            console.log(event.start_date_time);
        }

        setEvents(data.data);
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <Grid container direction="column" minHeight={'100%'}>
            {events.map((e) => {
                return <EventListItem key={e.id} title={e.title} date={e.start_date_time} thumbnailURL={e.image_url}/>
            })}
        </Grid>
    )
}