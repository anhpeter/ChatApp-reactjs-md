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
            name: "Peter Anh",
            picture: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.0-9/61103469_1109770422558853_2564158225184194560_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_ohc=BJ6L5IV_JfQAX8iDLtk&_nc_ht=scontent.fsgn2-5.fna&oh=ccf7880a2a77ee48a2fdf6663f3050c0&oe=6049EB1D",
            online: true,
            lastMessage: "Hello BlackPink =))",
        },
        {
            name: "Tran Hoang Khang",
            picture: "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/137561041_1853205284856919_7590474778452561765_o.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_ohc=Wh8AsYFtNE8AX8ZUxrZ&_nc_ht=scontent.fsgn2-3.fna&oh=5fd70fba323c9d72da5caa2ebd1e00ef&oe=604836B2",
            online: true,
            lastMessage: "Hi BlackPink =))",
        },
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
