import { useState, useEffect, useContext} from "react";
import {LoginContext} from "./LoginContext";

import axios from 'axios';

import Grid from '@mui/material/Grid'

import { FriendListItem } from './FriendListItem'

export function FriendList(props){
    const {loginInfo} = useContext(LoginContext);
    const [friends, setFriends] = useState([]);
    const selectionMap = props.selectionMap || null; //use to add select friends to array that parent element can

    async function fetchFriends(){
        const response = await axios.get("/friends/from-user-id?user_id=" + loginInfo.user_id);
        
        console.log("friends:");
        console.log(response.data);

        setFriends(response.data);
    }

    useEffect(() => {
        fetchFriends();
    }, []);
    
    return (
        <Grid container direction="column" display="flex" alignContent="center" style={{width: "100%"}}>
            {friends.map((friend) => {
                return <FriendListItem selectionMap={selectionMap} key={friend.id} friend={friend}/>
            })}
            
        </Grid>
    )
}