import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import SearchBar from './SearchBar'
import { Hidden } from '@material-ui/core'
import ToolbarTitle from './ToolbarTitle'
import mainStyles from '../defines/styles/MainStyles'

import List from '@material-ui/core/List';
import ConversationItem from './ConversationItem'


export default function ConversationList() {
    const classes = mainStyles();
    const conversations = [
        {
            name: "Jennie",
            picture: "https://cdn1.i-scmp.com/sites/default/files/styles/768x768/public/images/methode/2019/01/16/07a7ab2a-17ce-11e9-8ff8-c80f5203e5c9_image_hires_160333.jpg?itok=SYxUEfvx&v=1547625814",
            online: true,
            lastMessage: "Will you free tonight?",
        },
        {
            name: "Lisa",
            picture: "https://assets.vogue.com/photos/5ebc71d4a85f0288b7c3efda/16:9/w_3376,h_1899,c_limit/lisa-promo-crop.jpg",
            online: true,
            lastMessage: "Good job!",
        },
        {
            name: "Jisoo",
            picture: "https://upload.wikimedia.org/wikipedia/commons/3/38/Kim_Ji-soo_at_Jimmy_Choo_Event_on_January_09%2C_2020_%287%29.jpg",
            lastMessage: "Congratulations",
        },
        {
            name: "Rose",
            picture: "https://i.pinimg.com/originals/76/fa/eb/76faeb9c818efdf76cf066aea3685a80.jpg",
            lastMessage: "Hello, long time no see!",
        },
    ]

    const conversationsHtml = conversations.map((item, i) => {
        return (
            <ConversationItem key={i} item={item} ></ConversationItem>
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
