import React, { useState } from 'react'
import { Grid, TextField, Fab } from '@material-ui/core'
import { Send as SendIcon } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux';
import { setNotify } from '../../features/notify/NotifySlice';
import MySocket from '../../defines/Socket/MySocket';
import { loggedUser } from '../../features/auth/authSlice';
import { conversation } from '../../features/chat/ChatSlice';

let myTimeoutObj;
export default function SendingInput() {
    const [inputMsg, setInputMsg] = useState('');
    const [isTyping, setTyping] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(loggedUser);
    const convo = useSelector(conversation);

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
            //MySocket.emitSendMessage(user, inputMsg);
            console.log('convo', convo);
            MySocket.emitSendMessage(user, inputMsg, convo._id);
            setInputMsg('');
        }
    }

    const emitTyping = () => {
        if (!isTyping && inputMsg.trim() !== '') MySocket.emitTyping(user, convo._id);
        setTyping(true);
        clearTimeout(myTimeoutObj);
        myTimeoutObj = setTimeout(() => {
            emitStopTyping();
        }, 2000);
    }

    const emitStopTyping = () => {
        if (isTyping) {
            MySocket.emitStopTyping(user.username, convo._id);
            setTyping(false);
        }
    }

    // SOLVE TYPING
    const onKeyUp = (e) => {
        if (e.which !== 13) {
            if (inputMsg.length > 3) emitTyping();
        } else {
            emitStopTyping();
        }
    }

    const onBlur = () => {
        emitStopTyping();
    }

    return (
        <form onSubmit={(e) => { onSendingMessage(e) }}>
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={10} md={11}>
                    <TextField
                        autoFocus={true}
                        inputProps={{
                            autoComplete: 'off'
                        }}
                        value={inputMsg} id="outlined-basic-email" fullWidth onChange={onInputChange} onKeyUp={onKeyUp} onBlur={onBlur} />
                </Grid>
                <Grid item xs={2} md={1} align="center">
                    <Fab color="primary" aria-label="add" onClick={onSendingMessage}><SendIcon /></Fab>
                </Grid>
            </Grid>
        </form >
    )
}
