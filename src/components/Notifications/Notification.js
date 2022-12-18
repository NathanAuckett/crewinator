import { toast } from 'react-toastify';

export class Notification {
    constructor (title, description, thumbnailURL, accept, decline) {
        this.title = title;
        this.description = description;
        this.thumbnailURL = thumbnailURL;
        this.accept = accept;
        this.decline = decline;
    }
}

export function friendRequestAccept(friend_id, setShowNotifications){
    return {
        'friend_id': friend_id,
        'text': 'Accept',
        'callback': async () => {
            const json = JSON.stringify({'status': 'accepted', 'id': friend_id});
            
            await fetch("/friends/set-friendship-status", {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: json
            });

            toast("Friend request accepted!");
            setShowNotifications(false);
        }
    }
}

export function friendRequestDecline(friend_id, setShowNotifications){
    return {
        'friend_id': friend_id,
        'text': 'Decline',
        'callback': async () => {
            const json = JSON.stringify({'status': 'declined', 'id': friend_id});
            
            await fetch("/friends/set-friendship-status", {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: json
            });

            toast("Friend request declined!");
            setShowNotifications(false);
        }
    }
}

export function eventRequestAccept(event_invite_id, setShowNotifications){
    return {
        'event_invite_id': event_invite_id,
        'text': 'Accept',
        'callback': async () => {
            const json = JSON.stringify({'status': 'accepted', 'event_invite_id': event_invite_id});
            
            await fetch("/event-invites/set-invite-status", {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: json
            });

            toast("Event invitation accepted!");
            setShowNotifications(false);
        }
    }
}

export function eventRequestDecline(event_invite_id, setShowNotifications){
    return {
        'event_invite_id': event_invite_id,
        'text': 'Decline',
        'callback': async () => {
            const json = JSON.stringify({'status': 'declined', 'event_invite_id': event_invite_id});
            
            await fetch("/event-invites/set-invite-status", {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: json
            });

            toast("Event invitation declined!");
            setShowNotifications(false);
        }
    }
}