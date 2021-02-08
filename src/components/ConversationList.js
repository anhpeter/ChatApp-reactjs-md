import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import SearchBar from './SearchBar'
import { Hidden} from '@material-ui/core'
import ToolbarTitle from './ToolbarTitle'
import mainStyles from '../defines/styles/MainStyles'

import List from '@material-ui/core/List';
import ConversationItem from './ConversationItem'


export default function ConversationList() {
    const classes = mainStyles();

    let conversations = [];
    for (let i = 0; i < 5; i++) {
        conversations.push(i);
    }
    conversations = conversations.map((i) => {
        return (
            <ConversationItem key={i} ></ConversationItem>
        )
    })

    return (
        <Grid container direction="column" className={`${classes.borderRight500} `}>
            {/* TITLE & CHAT ACTION */}
            <Grid item xs={12} >
                <Toolbar>
                    <ToolbarTitle title="Chats"></ToolbarTitle>
                    {/*  
                    <Hidden smDown>
                        <ChatAction></ChatAction>
                    </Hidden>
                    */}
                </Toolbar>
            </Grid>

            {/* SEARCH BAR */}
            <Hidden mdDown>
                <Grid item xs={12}>
                    <SearchBar></SearchBar>
                </Grid>
            </Hidden>

            <Grid item xs={12} >
                <List className={`${classes.chatSection} custom-scrollbar`}>
                    {conversations}
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}></List>
            </Grid>
            <Grid item xs={9}></Grid>
        </Grid>
    )
}
