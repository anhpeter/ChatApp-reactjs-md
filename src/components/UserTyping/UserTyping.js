import { Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import MySocket from '../../defines/Socket/MySocket'
import Socket from '../../defines/Socket'
import MyAvatar from '../MyAvatar/MyAvatar';
import SocketEventName from '../../defines/Socket/SocketEventName';

export default function UserTyping() {
    const [typingUsers, setTypingUsers] = useState([]);
    useEffect(() => {
        MySocket.onTyping((data) => {
            setTypingUsers(typingUsers.concat(data.user));
        })
        MySocket.onStopTyping((data) => {
            setTypingUsers(typingUsers.filter((user) => {
                return user.username !== data.username;
            }));
        })
        return () => {
            Socket.off(SocketEventName.typing);
            Socket.off(SocketEventName.stopTyping);
        }
    })

    const typingHtml = typingUsers.map((user) => {
        return (
            <div key={user._id}>
                <div style={{ display: 'flex', alignItems: 'flex-start', }}>
                    <span>
                        <MyAvatar name={user.username} picture={user.picture}> </MyAvatar>
                    </span>
                    <img className="typing-icon" src={`${process.env.PUBLIC_URL}/images/icons/typing-icon.gif`} alt="typing" />
                </div>
            </div>
        )
    })
    return (
        <Paper elevation={0} style={{ minWidth: '200px' }}>
            {(typingHtml.length > 0 ? typingHtml : null)}
        </Paper>
    )
}
