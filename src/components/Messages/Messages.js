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
                ...data,
            }
            setMessages(messages.concat(messageObj))
            scroll()

        })
        return () => {
            Socket.off('receive-message');
        }
    })

    const messagesHtml = messages.map((item, index) => {
        let timeString = dateFormat(MyTime.getCurrentTimeByUTCTime(item.time), 'HH:MM');
        return <Message ownMessage={item.user.username === user.username} key={index} user={item.user}  message={item.message} time={timeString}></Message>
    })

    const emptyHtml = (
        <React.Fragment>
            <Box mt={4}>
                <Typography className="text-muted" align="center" >Let's start a conversation!</Typography>
            </Box>
        </React.Fragment>
    )

    return (
        <List className={`${classes.messageArea} custom-scrollbar`} id="my-messages-container" >
            {messagesHtml.length > 0 ? messagesHtml : emptyHtml}
        </List>
    )
}
