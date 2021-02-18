import { Box, Grid, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MyAvatar from '../MyAvatar/MyAvatar';

export default function Message(props) {
    const avatar = (<MyAvatar sizeInPixel={20} name={props.user.username} picture={props.user.picture}></MyAvatar>);
    const position = (props.ownMessage) ? 'right' : 'left';
    const flexPos = (props.ownMessage) ? 'flex-end' : 'flex-start';
    return (
        <ListItem key="1">
            <Box width="100%" style={{ display: 'flex', justifyContent: flexPos, alignItems: 'center' }}>
                {/* AVATAR */}
                {!props.ownMessage ? avatar : null}

                {/* MESSAGE AND TIME */}
                <Box className={`message ${position}-message`}>
                    <Tooltip title={props.time} placement="bottom">
                        <ListItemText align={position} primary={props.message} ></ListItemText>
                        {/* 
                    <ListItemText align={position} secondary={props.time} ></ListItemText>
                     */}
                    </Tooltip>
                </Box>
            </Box>

        </ListItem>
    )
}
