
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Paper from "@mui/material/Paper"

function EventLine(props) {
    const title = props.title;
    const time = props.time;
    
    return (
        <p style={{fontSize: '0.9rem'}}>{time} - {title}</p>
    )
}

export function CalendarDay(props){
    const events = props.events;

    return (
        <Grid xs={2} style={{height: "8rem"}}>
            <Paper variant="outlined" square className="LiftOnHover" style={{width: "100%", height: "100%", textAlign: "center", overflowY: "scroll"}}>
                <h4 style={{margin: 0, marginTop: "0.2rem"}}>{props.dayNum}</h4>
                {events.map((e) => {
                    let time = e.start_date_time.format('h:mm A');

                    return <EventLine key={e.event_id} title={e.title} time={time}/>
                })}
            </Paper>
        </Grid>
    )
}