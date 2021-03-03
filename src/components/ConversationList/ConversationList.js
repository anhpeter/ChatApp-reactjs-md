import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import SearchBar from '../SearchBar/SearchBar'
import { Box, Hidden } from '@material-ui/core'
import mainStyles from '../../defines/styles/MainStyles'

import List from '@material-ui/core/List';
import ConversationItem from '../ConversationItem/ConversationItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAndPrependConversationById, fetchConversations, selectAllSidebarConversations, selectSidebarConversationIds, updateLastMessage } from '../../features/sidebarConversations/SidebarConversationsSlice'
import { authUser } from '../../features/auth/authSlice'
import MySocket from '../../defines/Socket/MySocket'
import SocketEventName from '../../defines/Socket/SocketEventName'
import Socket from '../../defines/Socket'
import { conversationId } from '../../features/chat/ChatSlice'


export default function ConversationList() {
    const classes = mainStyles();
    const dispatch = useDispatch();
    const conversations = useSelector(selectAllSidebarConversations);
    const loggedUser = useSelector(authUser);
    const ids = useSelector(selectSidebarConversationIds);
    const convoId = useSelector(conversationId);

    useEffect(() => {
        dispatch(fetchConversations({ id: loggedUser._id }));
    }, [])

    useEffect(() => {
        const myFunc = (data) => {
            console.log('noti')
            const { message, conversationId } = data;
            if (ids.indexOf(conversationId) > -1) {
                dispatch(updateLastMessage({ id: conversationId, message }));
            } else {
                dispatch(fetchAndPrependConversationById({ id: conversationId }));
            }
        }
        MySocket.onNewMessageNotification(myFunc)
        return () => {
            Socket.removeListener(SocketEventName.newMessageNotification, myFunc);
        }
    }, [convoId, ids])


    const conversationsHtml = conversations.map((item, i) => {
        return (
            <ConversationItem key={i} item={item}></ConversationItem>
        )
    })

    return (
        <Grid container direction="column" >
            {/* SEARCH BAR */}
            <Hidden mdDown>
                <Grid item xs={12}>
                    <SearchBar></SearchBar>
                </Grid>
            </Hidden>

            <Grid item xs={12} >
                {/* 
                <Box mt={2} >
                    <HomeConversationItem></HomeConversationItem>
                </Box>
                 */}
                <List className={`${classes.chatSection} custom-scrollbar`}>
                    {conversationsHtml}
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}></List>
            </Grid>
            <Grid item xs={9}></Grid>
        </Grid>
    )
}
