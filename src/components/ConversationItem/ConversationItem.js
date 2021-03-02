import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MyAvatar from '../MyAvatar/MyAvatar';
import { Avatar, Hidden, ListItemAvatar, makeStyles } from '@material-ui/core';
import { authUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import ConversationLink from '../ConversationLink/ConversationLink';
import RouterLink from '../RouterLink/RouterLink';
import { conversationId } from '../../features/chat/ChatSlice';

const useStyle = makeStyles({
    truncateListItemStyle: {
        '& > p': {
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
        }
    }
})


export default function ConversationItem({ item, online, icon }) {
    const classes = useStyle();
    const user = useSelector(authUser);
    const convoId = useSelector(conversationId);
    const friend = item.members.find((item) => {
        return item._id !== user._id;
    })
    let lastMessageText = null;
    if (item.lastMessage) {
        let prefix = (item.lastMessage) ? (item.lastMessage.from._id === user._id ? 'you: ' : null) : null;
        lastMessageText = prefix !== null ? `${prefix} ${item.lastMessage.text}` : item.lastMessage.text;
    }
    return (
        <RouterLink to={`/chat/t/${item._id}`}>
            <ListItem button selected={convoId === item._id}>
                <ListItemAvatar>
                    {
                        icon ? (<Avatar> {icon} </Avatar>) :
                            (
                                <MyAvatar online={online} name={friend.username} single={true} picture={friend.picture}></MyAvatar>
                            )
                    }
                </ListItemAvatar>
                <Hidden smDown>
                    <ListItemText className={classes.truncateListItemStyle} primary={friend.username} secondary={lastMessageText}></ListItemText>
                </Hidden>
            </ListItem >
        </RouterLink>
    )
}
