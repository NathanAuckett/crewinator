import { useState, useEffect, useContext} from "react";
import {LoginContext} from "../components/LoginContext";

import Grid from '@mui/material/Grid'

import { FriendListItem } from '../components/FriendListItem'

export function FriendList(){
    const {loginInfo} = useContext(LoginContext);
    const [friends, setFriends] = useState([]);

    async function fetchFriends(){
        const response = await fetch("/friends/from-user-id?user_id=" + loginInfo.user_id);
        const data = await response.json();
        
        console.log("friends:");
        console.log(data);

        setFriends(data.data);
    }

    useEffect(() => {
        fetchFriends();
    }, []);
    
    return (
        <Grid container direction="column" display="flex" alignContent="center" style={{width: "100%"}}>
            <Grid textAlign="center">
                <h2>Friends</h2>
            </Grid>
            {friends.map((e) => {
                return <FriendListItem key={e.id} username={e.username}/>
            })}
            
        </Grid>
    )
}