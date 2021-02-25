import { Typography } from '@material-ui/core'
import React from 'react'

export default function ChatNotification({ username, type }) {
    let usernameHtml = <Typography component="span" color="primary">{username}</Typography>;
    let content;
    switch (type) {
        case 'welcome-current-user-notification':
            content = 'Welcome to the chat room.';
            break;
        case 'welcome-other-user-notification':
            content = <span>{usernameHtml} has joined the chat.</span>;
            break;
        case 'user-left-notification':
            content = <span>{usernameHtml} has left the chat.</span>;
            break;
        default:
            content = '';
    }
    return (
        <Typography align="center" className="text-muted">{content}</Typography>
    )
}
