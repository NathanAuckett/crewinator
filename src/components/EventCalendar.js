import { useState, useEffect, useContext } from "react";
import {LoginContext} from "./LoginContext";
import dayjs from 'dayjs';
import axios from 'axios';

import Grid from "@mui/material/Unstable_Grid2/Grid2"

import { CalendarDay } from "./CalendarDay"

export function EventCalendar(props){
    const {loginInfo} = useContext(LoginContext);
    const [days, setDays] = useState([]);

    async function fetchAndPopulateDays(){
        const response = await axios.get("/events/?month=12&user_id=" + loginInfo.user_id);
        const data = response.data;

        //Turn dates into datejs objects
        for (let event of data){
            event.start_date_time = dayjs(event.start_date_time);
        }

        //Build the calendar array and insert events into their appropriate days
        const today = new Date();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        let tempDays = [];
        let day;
        for (let i = 1; i <= daysInMonth; i ++){
            day = {day: i, events: []};

            for (let event of data){
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