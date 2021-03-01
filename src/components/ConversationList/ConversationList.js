import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import SearchBar from '../SearchBar/SearchBar'
import { Box, Hidden } from '@material-ui/core'
import mainStyles from '../../defines/styles/MainStyles'

import List from '@material-ui/core/List';
import ConversationItem from '../ConversationItem/ConversationItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchConversations, selectAllSidebarConversations } from '../../features/sidebarConversations/SidebarConversationsSlice'
import { authUser } from '../../features/auth/authSlice'


export default function ConversationList() {
    const classes = mainStyles();
    const dispatch = useDispatch();
    const conversations = useSelector(selectAllSidebarConversations);
    const loggedUser = useSelector(authUser);

    useEffect(() => {
        console.log('dispatch', loggedUser._id);
        dispatch(fetchConversations({ id: loggedUser._id }));
    }, [])

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
