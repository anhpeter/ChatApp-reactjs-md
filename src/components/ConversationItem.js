import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Hidden } from '@material-ui/core';


export default function ConversationItem() {
    return (

        <ListItem button key="RemySharp">
            <ListItemIcon>
                <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg" />
            </ListItemIcon>
            <Hidden smDown>
                <ListItemText primary="Remy Sharp">Peter Anh</ListItemText>
                <ListItemText secondary="online" align="right"></ListItemText>
            </Hidden>
        </ListItem>
    )
}
