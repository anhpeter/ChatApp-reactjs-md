import { Button } from '@material-ui/core'
import React from 'react'
import mainStyles from '../../defines/styles/MainStyles'

export default function SentRequestAction({ user }) {
    const classes = mainStyles();
    const onConfirmClick = () => {
        alert(user.username);
    }

    const onDeleteClick = () => {
        alert(user.username);
    }
    return (
        <React.Fragment>
            <Button onClick={onConfirmClick} color="primary" variant="contained" size="small" className={classes.buttonStyle}>Confirm</Button>
            <Button onClick={onDeleteClick} variant="contained" size="small" className={classes.buttonStyle}>Delete</Button>
        </React.Fragment>
    )
}
