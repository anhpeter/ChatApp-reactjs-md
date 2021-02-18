import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import MySocket from '../../defines/MySocket'
import Socket from '../../defines/Socket'
import MyAvatar from '../MyAvatar/MyAvatar';

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
            Socket.off('typing');
            Socket.off('stop-typing');
        }
    })

    const typingHtml = typingUsers.map((user) => {
        return (
            <div key={user._id}>
                <div style={{ display: 'flex', alignItems: 'center', }}>
                    <span>
                        <MyAvatar name={user.username} picture={user.picture}> </MyAvatar>
                    </span>
                    <img className="typing-icon" src={`${process.env.PUBLIC_URL}/images/icons/typing-icon.gif`} alt="typing" />
                </div>
            </div>
        )
    })
    return (
        <div>
            {(typingHtml.length > 0 ? typingHtml : null)}
        </div>
    )
}
