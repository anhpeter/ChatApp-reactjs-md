import React, { useEffect, useState } from 'react'
import { Box, List, Typography } from '@material-ui/core'
import Message from '../Message/Message'
import mainStyle from '../../defines/styles/MainStyles'
import MySocket from '../../defines/MySocket';
import Socket from '../../defines/Socket';
import { useSelector } from 'react-redux';
import { loggedUser } from '../../features/auth/authSlice';
import * as dateFormat from 'dateformat';
import MyTime from '../../defines/MyTime';
import ScrollToBottom, { useScrollToBottom } from 'react-scroll-to-bottom';
import ChatNotification from '../ChatNotification/ChatNotification';

export default function Messages() {
    const classes = mainStyle();
    const [messages, setMessages] = useState([]);
    const user = useSelector(loggedUser);

    const scroll = () => {
        let container = document.getElementById('my-messages-container');
        container.scrollTop = container.scrollHeight;

    }

    useEffect(() => {
        MySocket.onReceiveMessage((data) => {
            const messageObj = {
                type: 'message',
                ...data,
            }
            setMessages(messages.concat(messageObj))
            scroll();

        })
        MySocket.onNewJoiner((data) => {
            let t = (data.user.username === user.username) ? 'current-user' : 'other-user'
            const obj = {
                type: `welcome-${t}-notification`,
                ...data,
            }
            setMessages(messages.concat(obj))
            scroll();
        })

        MySocket.onUserLeft((data) => {
            const obj = {
                type: 'user-left-notification',
                ...data,
            }
            setMessages(messages.concat(obj))
            scroll();
        })
        return () => {
            Socket.off('receive-message');
            Socket.off('new-joiner');
            Socket.off('user-left');
        }
    })

    const messagesHtml = messages.map((item, index) => {
        if (item.type === 'message') {
            let notShowAvatar = false;
            if (index < messages.length - 1) {
                const nextItem = messages[index + 1];
                notShowAvatar = (nextItem.type === 'message') ? nextItem.user.username === item.user.username : false;
            }
            return <Message notShowAvatar={notShowAvatar} ownMessage={item.user.username === user.username} key={index} user={item.user} message={item.message} time={item.time}></Message>
        } else {
            let content;
            let usernameHtml = <Typography component="span" color="primary">{item.user.username}</Typography>;
            switch (item.type) {
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
            return <ChatNotification key={index}>{content}</ChatNotification>
        }
    })

    const emptyHtml = (
        <React.Fragment>
            <Box mt={4}>
                <Typography className="text-muted" align="center" >Let's start a conversation.</Typography>
            </Box>
        </React.Fragment>
    )

    return (
        <List className={`${classes.messageArea} custom-scrollbar`} id="my-messages-container" >
            {messagesHtml.length > 0 ? messagesHtml : emptyHtml}
        </List>
    )
}
