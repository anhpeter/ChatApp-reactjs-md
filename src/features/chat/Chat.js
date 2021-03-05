import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { useEffect } from 'react'
import Slt from '../../defines/Slt'
import ConversationList from '../../components/ConversationList/ConversationList'
import ChatBox from '../../components/ChatBox/ChatBox'
import OnlineUsers from '../../components/OnlineUser/OnlineUsers'
import useStyles from '../../defines/styles/MainStyles'
import { Box, Hidden } from '@material-ui/core'

export default function Chat() {
    const classes = useStyles();
    const [appBarHeight,
        setAppBarHeight] = useState(0);

    // HANDLE HEIGHT
    const heightStyle = {
        height: `calc(100vh - ${appBarHeight}px)`
    }

    const handleAppBarResize = () => {
        let height = document
            .getElementById(Slt.mainAppBar)
            .clientHeight;
        setAppBarHeight(height);
    }

    // HANDLE APP BAR RESIZE
    useEffect(() => {
        //handleAppBarResize();
        //window.addEventListener('resize', handleAppBarResize)
    }, []);

    // DISPLAY LATEST CONVERSATION

    return (
        <Box className="main-content" p={2} >
            <Grid style={{ height: '100%' }} container >
                <Grid style={{ height: '100%', padding: 0 }} item xs={3} className={`${classes.borderRight500}`} >
                    <ConversationList></ConversationList>
                </Grid>
                <Grid style={{ height: '100%' }} item xs={9} md={7}>
                    <ChatBox>
                        Loading...
                    </ChatBox>
                </Grid>
                <Hidden smDown stle>
                    <Grid style={{ height: '100%', padding: 0 }} item xs={false} md={2} className={`${classes.borderLeft500} `}>
                        <OnlineUsers />
                    </Grid>
                </Hidden>
            </Grid>
        </Box>
    )
}
