import React, { useState } from 'react'
import { Grid, TextField, Fab } from '@material-ui/core'
import { Send as SendIcon } from '@material-ui/icons'
import { useDispatch } from 'react-redux';
import { setNotify } from '../../features/notify/NotifySlice';

export default function SendingInput() {
    const [inputMsg, setInputMsg] = useState('');
    const dispatch = useDispatch();

    // INPUT CHANGE
    const onInputChange = (e) => {
        setInputMsg(e.target.value);
        console.log(`msg: ${inputMsg}`)
    }

    // ON SENDING MESSAGE
    const onSendingMessage = () => {
        if (inputMsg.trim() === '') {
            // INVALID
            dispatch(setNotify({ message: 'Please type some message to send!', open: true , timeout: 2000}));
        } else {

        }
    }

    return (
        <Grid container style={{ padding: '20px' }}>
            <Grid item xs={10} md={11}>
                <TextField value={inputMsg} id="outlined-basic-email" label="Type Something" fullWidth onChange={onInputChange} />
            </Grid>
            <Grid item xs={2} md={1} align="center">
                <Fab color="primary" aria-label="add" onClick={onSendingMessage}><SendIcon /></Fab>
            </Grid>
        </Grid>
    )
}
