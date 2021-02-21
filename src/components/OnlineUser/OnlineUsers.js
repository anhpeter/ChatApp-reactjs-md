import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MyAvatar from '../MyAvatar/MyAvatar';
import Socket from '../../defines/Socket';
import MySocket from '../../defines/Socket/MySocket';
import { useSelector } from 'react-redux';
import { loggedUser } from '../../features/auth/authSlice';
import { Hidden, Typography } from '@material-ui/core';
import SocketEventName from '../../defines/Socket/SocketEventName';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

export default function OnlineUsers({ item }) {
    const classes = useStyles();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const user = useSelector(loggedUser);
    useEffect(() => {
        MySocket.onOnlineUsers((data) => {
            setOnlineUsers(data)
        })
        return () => {
            Socket.off(SocketEventName.onlineUsers);
        }
    }, [])

    item = item || {};
    const onlineUsersHtml = onlineUsers.filter((item) => {
        return (item.username !== user.username)
    }).map((item) => {
        return (
            <ListItem key={item._id} button>
                <ListItemAvatar >
                    <MyAvatar online={true} name={item.name} single={item.single} picture={item.picture}></MyAvatar>
                </ListItemAvatar>
                <Hidden smDown>
                    <ListItemText
                        primary={item.username}
                    />
                </Hidden>
            </ListItem>
        )
    })

    const emptyHtml = (
        <Typography className="text-muted" align="center" >No online users</Typography>
    )

    return (
        <List className={classes.root}>
            {onlineUsersHtml.length > 0 ? onlineUsersHtml : emptyHtml}
        </List >
    );
}