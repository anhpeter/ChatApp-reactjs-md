import { Button } from '@material-ui/core'
import React from 'react'
import mainStyles from '../../defines/styles/MainStyles'

export default function SentRequestAction({ user }) {
    const classes = mainStyles();
    const onAddFriend = () => {
        alert(user.username);
    }
    return (
        <React.Fragment>
            <Button onClick={onAddFriend} color="primary" variant="contained" size="small" className={classes.buttonStyle}>Add friend</Button>
        </React.Fragment>
    )
}
