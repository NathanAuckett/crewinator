import dayjs from 'dayjs';

import { useState, useEffect } from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2"

import {EventListItem} from "./EventListItem"

export function EventList(props){
    const [events, setEvents] = useState([]);

    async function fetchEvents(){
        const response = await fetch("http://127.0.0.1:4000/events/future");
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