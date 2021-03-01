import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MyAvatar from '../MyAvatar/MyAvatar';
import Socket from '../../defines/Socket';
import MySocket from '../../defines/Socket/MySocket';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../features/auth/authSlice';
import { Hidden, Typography } from '@material-ui/core';
import SocketEventName from '../../defines/Socket/SocketEventName';
import AppTitle from '../AppTitle/AppTitle';
import { conversationId, fetchConversationByUserIdsOrCreateIfNotExist, conversationMemberIds } from '../../features/chat/ChatSlice';
import ConversationApi from '../../defines/https/ConversationApi';
import { useHistory } from 'react-router-dom';
import Helper from '../../defines/Helper';
import ConversationLink from '../ConversationLink/ConversationLink';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

export default function OnlineUsers({ item }) {
    const classes = useStyles();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isShow, setShow] = useState(false);
    const user = useSelector(authUser) || {};
    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 500);
        MySocket.emitGetOnlineUsers();
        MySocket.onOnlineUsers((data) => {
            setOnlineUsers(data)
        })
        return () => {
            Socket.off(SocketEventName.onlineUsers);
        }
    }, [])

    const onlineUsersHtml = onlineUsers.filter((item) => {
        return (item.username !== user.username)
    }).map((item) => {
        return (
            <ConversationLink key={item._id} button component={ListItem} item={item}>
                <ListItemAvatar >
                    <MyAvatar online={true} name={item.name} single={item.single} picture={item.picture}></MyAvatar>
                </ListItemAvatar>
                <Hidden smDown>
                    <ListItemText
                        primary={item.username}
                    />
                </Hidden>
            </ConversationLink>
        )
    })

    const emptyHtml = (
        <Typography className="text-muted" align="center" >No online users</Typography>
    )

    return (
        <React.Fragment>
            <AppTitle title="Online"></AppTitle>
            <List className={classes.root}>
                {
                    isShow
                        ? (onlineUsersHtml.length > 0 ? onlineUsersHtml : emptyHtml)
                        : null
                }
            </List >
        </React.Fragment>
    );
}