import { Button } from '@material-ui/core'
import React from 'react'
import mainStyles from '../../defines/styles/MainStyles'

export default function SentRequestAction({ user }) {
    const classes = mainStyles();
    const onCancelClick = () => {
        alert(user.username);
    }
    return (
        <React.Fragment>
            <Button onClick={onCancelClick} variant="contained" size="small" className={classes.buttonStyle}>Cancel request</Button>
        </React.Fragment>
    )
}
