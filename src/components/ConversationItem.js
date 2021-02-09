import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Box, Hidden, makeStyles, Typography } from '@material-ui/core';

const useStyle = makeStyles({
    truncateListItemStyle: {
        '& > p': {
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
        }
    }
})


export default function ConversationItem() {
    const classes = useStyle();
    return (
        <ListItem button key="RemySharp" >
            <ListItemIcon>
                <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg" />
            </ListItemIcon>
            <ListItemText className={classes.truncateListItemStyle} primary="Peter" secondary="Hello, how are your? Hello, how are your? Hello, how are your? "></ListItemText>
        </ListItem >
    )
}
