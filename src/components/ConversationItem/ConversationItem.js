import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MyAvatar from '../MyAvatar/MyAvatar';
import MyAvatarGroup from '../MyAvatarGroup/MyAvatarGroup';
import { Avatar, Box, Hidden, ListItemAvatar, makeStyles, Tooltip } from '@material-ui/core';
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

const GenerateAvatarGroup = ({ items }) => {
    items = items.map((item) => {
        return {
            name: item.username,
            src: item.picture,
        }
    })
    return <MyAvatarGroup items={items}></MyAvatarGroup>
}


export default function ConversationItem({ item, online, icon }) {
    const classes = useStyle();
    const user = useSelector(authUser);
    const convoId = useSelector(conversationId);
    const { members } = item;
    const friends = members.filter((item) => {
        return item._id !== user._id;
    })
    let name, lastMessageText = null;
    if (members.length === 2) {
        name = friends[0].username;
    } else {
        name = `${friends[0].username} and ${friends.length - 1} others`;
    }
    if (item.lastMessage) {
        let prefix = (item.lastMessage) ? (item.lastMessage.from._id === user._id ? 'you: ' : (friends.length > 1 ? `${item.lastMessage.from.username}: ` : null)) : null;
        lastMessageText = prefix !== null ? `${prefix} ${item.lastMessage.text}` : item.lastMessage.text;
    }

    const title = friends.reduce((accumulator, currentVal) => {
        return `${accumulator}, ${currentVal.username}`;
    }, '').replace(/^, /, '');
    return (
        <RouterLink to={`/chat/t/${item._id}`}>
            <Tooltip title={title}>
                <ListItem button selected={convoId === item._id}>
                    <ListItemAvatar style={{ width: '90px', overflow: 'hidden' }}>
                        {
                            icon ? (<Avatar> {icon} </Avatar>) :
                                (
                                    members.length === 2
                                        ? <MyAvatar online={online} name={name} single={true} picture={friends[0].picture}></MyAvatar>
                                        : <GenerateAvatarGroup items={friends}></GenerateAvatarGroup>
                                )
                        }
                    </ListItemAvatar>
                    <Hidden xsDown>
                        <ListItemText className={classes.truncateListItemStyle} primary={name} secondary={lastMessageText}></ListItemText>
                    </Hidden>
                </ListItem >
            </Tooltip>
        </RouterLink>
    )
}
