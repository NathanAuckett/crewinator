
export class Notification {
    constructor (title, description, accept) {
        this.title = title;
        this.description = description;
        this.accept = accept;
    }
}

export function friendRequestAccept(friend_id){
    return {
        'friend_id': friend_id,
        'text': 'Accept',
        'callback': async () => {
            const json = JSON.stringify({'status': 'accepted', 'id': friend_id});
            
            const response = await fetch("http://127.0.0.1:4000/friends/set-friendship-status", {
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