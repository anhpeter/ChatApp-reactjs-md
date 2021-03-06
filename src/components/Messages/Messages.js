import React, { useEffect, useState } from 'react'
import { Box, List, Typography } from '@material-ui/core'
import Message from '../Message/Message'
import mainStyle from '../../defines/styles/MainStyles'
import { useSelector } from 'react-redux';
import { authUser } from '../../features/auth/authSlice';
import ChatNotification from '../ChatNotification/ChatNotification';
import './Messages.css'
import { isNewChatEnable } from '../../features/NewChat/NewChatSlice';

const emptyHtml = (
    <React.Fragment>
        <Box mt={4}>
            <Typography className="text-muted" align="center" >Let's start a conversation.</Typography>
        </Box>
    </React.Fragment>
)

const scroll = () => {
    let containers = document.getElementsByClassName('chat-box-messages-wrapper');
    containers[0].scrollTop = containers[0].scrollHeight;
}

export default function Messages({ messages }) {
    const user = useSelector(authUser);
    const newChatEnabled = useSelector(isNewChatEnable);

    // messages
    const messagesHtml = messages.map((item, index) => {
        if (item.from) {
            let notShowAvatar = false;
            if (index < messages.length - 1) {
                const nextItem = messages[index + 1];
                notShowAvatar = (nextItem.type === 'message') ? nextItem.from.username === item.from.username : false;
            }
            return <Message notShowAvatar={notShowAvatar} ownMessage={item.from.username === user.username} key={index} user={item.from} message={item.text} time={item.time}></Message>
        } else {
            return <ChatNotification key={index} username={item.user.username} type={item.type}></ChatNotification>
        }
    })

    useEffect(() => {
        scroll();
    }, [messages])

    return (
        <List className="chat-box-messages-wrapper custom-scrollbar" >
            {messagesHtml.length > 0 ? messagesHtml : (!newChatEnabled ? emptyHtml : null)}
        </List>
    )
}
