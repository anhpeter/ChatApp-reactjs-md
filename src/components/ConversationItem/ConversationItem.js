import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MyAvatar from '../MyAvatar/MyAvatar';
import { Avatar, Hidden, ListItemAvatar, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    truncateListItemStyle: {
        '& > p': {
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
        }
    }
})


export default function ConversationItem({ online, name, single, picture, lastMessage, icon }) {
    const classes = useStyle();
    return (
        <ListItem button >
            <ListItemAvatar>
                {
                    icon ? (<Avatar> {icon} </Avatar>) :
                        (
                            <MyAvatar online={online} name={name} single={single} picture={picture}></MyAvatar>
                        )
                }
            </ListItemAvatar>
            <Hidden smDown>
                <ListItemText className={classes.truncateListItemStyle} primary={name} secondary={lastMessage}></ListItemText>
            </Hidden>
        </ListItem >
    )
}
