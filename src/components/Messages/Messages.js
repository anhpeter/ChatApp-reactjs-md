import React, { useEffect, useState } from 'react'
import { List } from '@material-ui/core'
import Message from '../Message/Message'
import mainStyle from '../../defines/styles/MainStyles'
import MySocket from '../../defines/MySocket';
import Socket from '../../defines/Socket';
import { useSelector } from 'react-redux';
import { loggedUser } from '../../features/auth/authSlice';

export default function Messages() {
    const classes = mainStyle();
    const [messages, setMessages] = useState([]);
    const user = useSelector(loggedUser);
    useEffect(() => {
        MySocket.onReceiveMessage((data) => {
            const messageObj = {
                ...data,
                position: user.username === data.username ? 'right' : 'left',
            }
            setMessages(messages.concat(messageObj))
        })
        return () => {
            Socket.off('receive-message');
        }
    })

    const messagesHtml = messages.map((item, index) => {
        return <Message key={index} position={item.position} message={item.message} time={item.time}></Message>
    })
    return (
        <List className={classes.messageArea}>
            {messagesHtml}
        </List>
    )
}
