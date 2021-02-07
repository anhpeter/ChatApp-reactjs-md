import { Grid, TextField } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import mainStyles from '../defines/styles/MainStyles'
import Message from './Message';


export default function ChatBox() {
    const classes = mainStyles();
    return (
        <div>
            <List className={classes.messageArea}>
                <Message position="right" message="Hello, how are you?" time="09:30 am"></Message>
                <Message position="left" message="I'm fine, thank you." time="09:33 am"></Message>
                <Message position="right" message="Bye!" time="09:35 am"></Message>
            </List>
            <Divider />
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={11}>
                    <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                </Grid>
                <Grid xs={1} align="right">
                    <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                </Grid>
            </Grid>
        </div>
    )
}
