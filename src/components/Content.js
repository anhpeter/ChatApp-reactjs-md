import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Divider, makeStyles } from '@material-ui/core'
import { useEffect } from 'react'
import Slt from '../defines/Slt'
import ConversationList from './ConversationList'
import ChatBox from './ChatBox'

const useStyles = makeStyles({
})

export default function Content() {
    const classes = useStyles();
    const [appBarHeight, setAppBarHeight] = useState(0);

    const heightStyle = {
        height: `calc(100vh - ${appBarHeight}px)`,
    }

    const handleAppBarResize = () => {
        let height = document.getElementById(Slt.mainAppBar).clientHeight;
        setAppBarHeight(height);
    }

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
                    <ChatBox />

                </Grid>
            </Grid>
        </Grid>
    )
}
