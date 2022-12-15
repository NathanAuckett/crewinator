import { useState, useEffect } from "react";

import dayjs from 'dayjs';

import Grid from "@mui/material/Unstable_Grid2/Grid2"

import { CalendarDay } from "./CalendarDay"

export function EventCalendar(props){
    const [days, setDays] = useState([]);

    async function fetchAndPopulateDays(){
        const response = await fetch("/events/?month=12");
        const data = await response.json();

        //Turn dates into datejs objects
        for (let event of data.data){
            event.start_date_time = dayjs(event.start_date_time);
        }

        //Build the calendar array and insert events into their appropriate days
        const today = new Date();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        let tempDays = [];
        let day;
        for (let i = 1; i <= daysInMonth; i ++){
            day = {day: i, events: []};

            for (let event of data.data){
                let date = event.start_date_time.date();
                if (date === i){
                    day.events.push(event);
                }
            }

            tempDays[i] = day;
        }

        setDays(tempDays);
    }

    useEffect(() => {
        fetchAndPopulateDays();
    }, []);
    

    return (
        <Grid container>
            {days.map((day, i) => <CalendarDay key={i} dayNum={day.day} events = {day.events}/>)}
        </Grid>
    )
}