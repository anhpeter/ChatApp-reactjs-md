import { Box, Grid, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MyAvatar from '../MyAvatar/MyAvatar';
import MyTime from '../../defines/MyTime';

export default function Message({ notShowAvatar, ownMessage, time, user, message }) {
    const avatar = !notShowAvatar ? (<MyAvatar sizeInPixel={20} name={user.username} picture={user.picture}></MyAvatar>) : null;
    const position = (ownMessage) ? 'right' : 'left';
    const flexPos = (ownMessage) ? 'flex-end' : 'flex-start';
    const placement = (ownMessage) ? 'bottom-start' : 'bottom-end';
    return (
        <ListItem key="1">
            <Box width="100%" style={{ display: 'flex', justifyContent: flexPos, alignItems: 'flex-end' }}>
                {/* AVATAR */}
                {!ownMessage ? avatar : null}

                {/* MESSAGE AND TIME */}
                <Box className={`message ${position}-message ${!ownMessage && notShowAvatar ? 'ml-avatar' : ''}`}>
                    <Tooltip title={MyTime.getMessageTimeString(MyTime.getCurrentTimeByUTCTime(time))} placement={placement}>
                        <ListItemText align={position} primary={message} ></ListItemText>
                    </Tooltip>
                </Box>
            </Box>

        </ListItem>
    )
}
