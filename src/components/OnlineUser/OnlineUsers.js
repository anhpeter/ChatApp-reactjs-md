import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MyAvatar from '../MyAvatar/MyAvatar';
import Socket from '../../defines/Socket';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

export default function OnlineUsers({ item }) {
    const classes = useStyles();
    useEffect(() => {
        console.log('use effect called');
        
        Socket.on('onlineUsers', (data) => {
            console.log('user online', data);
        })
    }, [])

    item = item || {};

    return (
        <List className={classes.root}>
            <ListItem >
                <ListItemAvatar>
                    <MyAvatar online={true} name={item.name} single={item.single} picture={item.picture}></MyAvatar>
                </ListItemAvatar>
                <ListItemText
                    primary="peter"
                />
            </ListItem>
        </List>
    );
}