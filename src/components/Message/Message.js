import { Grid } from '@material-ui/core'
import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function Message(props) {
    return (
        <ListItem key="1">
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align={props.position} primary={props.message}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={props.position} secondary={props.time}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )
}
