import React, { useState } from 'react'
import { Grid, TextField, Fab } from '@material-ui/core'
import { Send as SendIcon } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux';
import { setNotify } from '../../features/notify/NotifySlice';
import MySocket from '../../defines/MySocket';
import { loggedUser } from '../../features/auth/authSlice';
import MyTime from '../../defines/MyTime';

export default function SendingInput() {
    const [inputMsg, setInputMsg] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(loggedUser);

    // INPUT CHANGE
    const onInputChange = (e) => {
        setInputMsg(e.target.value);
    }

    // ON SENDING MESSAGE
    const onSendingMessage = (e) => {
        e.preventDefault();
        if (inputMsg.trim() === '') {
            // INVALID
            dispatch(setNotify({ message: 'Please type some message to send!', open: true, timeout: 2000 }));
        } else {
            MySocket.emitSendMessage(user.username, inputMsg);
        }
    }


    return (
        <form onSubmit={(e) => { onSendingMessage(e) }}>
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={10} md={11}>
                    <TextField value={inputMsg} id="outlined-basic-email" label="Type Something" fullWidth onChange={onInputChange} />
                </Grid>
                <Grid item xs={2} md={1} align="center">
                    <Fab color="primary" aria-label="add" onClick={onSendingMessage}><SendIcon /></Fab>
                </Grid>
            </Grid>
        </form >
    )
}
