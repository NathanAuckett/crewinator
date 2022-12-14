
import { Link, useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';

export function NewButton(){
    const location = useLocation();

    let button;
    switch (location.pathname){
        case "/dashboard/library":
            button = <Link to="games"><Button variant="contained" style={{marginLeft: "1rem"}}>Add Game</Button></Link>;
            break;
        case "/dashboard/games":
            button = <Link to="new-game"><Button variant="contained" style={{marginLeft: "1rem"}}>New Game</Button></Link>;
            break;
        case "/dashboard/friends":
            button = <Link to="new-friend"><Button variant="contained" style={{marginLeft: "1rem"}}>Add Friend</Button></Link>;
            break;
        case "/dashboard":
            button = <Link to="new-event"><Button variant="contained" style={{marginLeft: "1rem"}}>New Event</Button></Link>
            break;
        default: button = null;
    }

    return button;
}