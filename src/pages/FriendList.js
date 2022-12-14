import { useState, useEffect, useContext} from "react";
import {LoginContext} from "../components/LoginContext";

import Grid from '@mui/material/Grid'

import { FriendListItem } from '../components/FriendListItem'

export function FriendList(){
    const {loginInfo} = useContext(LoginContext);
    const [friends, setFriends] = useState([]);
    console.log(loginInfo);

    async function fetchFriends(){
        const response = await fetch("http://127.0.0.1:4000/friends/from-user-id?user_id=" + loginInfo.user_id);
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