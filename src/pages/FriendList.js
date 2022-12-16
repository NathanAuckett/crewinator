import { useState, useEffect, useContext} from "react";
import {LoginContext} from "../components/LoginContext";

import Grid from '@mui/material/Grid'

import { FriendListItem } from '../components/FriendListItem'

export function FriendList(props){
    const {loginInfo} = useContext(LoginContext);
    const [friends, setFriends] = useState([]);
    const selectionListPusher = props.selectionListPusher || null; //use to add select friends to array that parent element can

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
            {friends.map((friend) => {
                return <FriendListItem selectionListPusher={selectionListPusher} key={friend.id} friend={friend}/>
            })}
            
        </Grid>
    )
}