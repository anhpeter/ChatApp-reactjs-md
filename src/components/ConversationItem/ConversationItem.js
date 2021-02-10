import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MyAvatar from '../MyAvatar/MyAvatar';
import { Hidden, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    truncateListItemStyle: {
        '& > p': {
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
        }
    }
})


export default function ConversationItem(props) {
    const classes = useStyle();
    return (
        <ListItem button >
            <ListItemIcon>
                <MyAvatar online={props.item.online} name={props.item.name} single={props.item.single} picture={props.item.picture}></MyAvatar>
            </ListItemIcon>
            <Hidden smDown>
                <ListItemText className={classes.truncateListItemStyle} primary={props.item.name} secondary={props.item.lastMessage}></ListItemText>
            </Hidden>
        </ListItem >
    )
}
