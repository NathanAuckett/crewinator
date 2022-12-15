
export class Notification {
    constructor (title, description, thumbnailURL, accept) {
        this.title = title;
        this.description = description;
        this.thumbnailURL = thumbnailURL;
        this.accept = accept;
    }
}

export function friendRequestAccept(friend_id){
    return {
        'friend_id': friend_id,
        'text': 'Accept',
        'callback': async () => {
            const json = JSON.stringify({'status': 'accepted', 'id': friend_id});
            
            const response = await fetch("/friends/set-friendship-status", {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: json
            });
            
            const data = await response.json();

            console.log(data);
        }
    }
}

export function eventRequestAccept(event_invite_id){
    return {
        'event_invite_id': event_invite_id,
        'text': 'Accept',
        'callback': async () => {
            const json = JSON.stringify({'status': 'accepted', 'event_invite_id': event_invite_id});
            
            const response = await fetch("/event-invites/set-invite-status", {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: json
            });
            
            const data = await response.json();

            console.log(data);
        }
    }
}