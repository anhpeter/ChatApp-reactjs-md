import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MyAvatar from '../MyAvatar/MyAvatar';

export default function Message(props) {
    const avatar = (<MyAvatar name={props.user.username} picture={props.user.picture}></MyAvatar>);
    const position = (props.ownMessage) ? 'right' : 'left';
    const flexPos = (props.ownMessage) ? 'flex-end' : 'flex-start';
    return (
        <ListItem key="1">
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align={position} primary={props.message} ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={position} secondary={
                        (
                            <div style={{ display: 'flex', justifyContent: flexPos, alignItems: 'center' }}>
                                {props.time} {!props.ownMessage ? avatar : null}
                            </div>
                        )
                    }></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )
}
