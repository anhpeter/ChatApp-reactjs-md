import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { useEffect } from 'react'
import Slt from '../../defines/Slt'
import ConversationList from '../../components/ConversationList'
import ChatBox from '../../components/ChatBox'

export default function Chat() {
    const [appBarHeight, setAppBarHeight] = useState(0);

    // HANDLE HEIGHT
    const heightStyle = {
        height: `calc(100vh - ${appBarHeight}px)`,
    }
    const handleAppBarResize = () => {
        let height = document.getElementById(Slt.mainAppBar).clientHeight;
        setAppBarHeight(height);
    }

    // USE EFFECTS
    useEffect(() => {
        handleAppBarResize();
        window.addEventListener('resize', handleAppBarResize)
    }, []);

    return (
        <Grid container>
            <Grid container item xs={12} style={heightStyle}>
                <Grid item xs={2} md={3} >
                    <ConversationList></ConversationList>
                </Grid>
                <Grid item xs={10} md={9}>
                    <ChatBox>
                        Loading...
                </ChatBox>
                </Grid>
            </Grid>
        </Grid>
    )
}
