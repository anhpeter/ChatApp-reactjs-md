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
    let container = document.getElementById('my-messages-container');
    container.scrollTop = container.scrollHeight;
}

export default function Messages({ messages }) {
    const classes = mainStyle();
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
        <React.Fragment>
            <List className={`${classes.messageArea} custom-scrollbar`} id="my-messages-container" >
                {messagesHtml.length > 0 ? messagesHtml : (!newChatEnabled ? emptyHtml : null)}
            </List>
        </React.Fragment >
    )
}
