import React, { useState } from 'react'
import { Grid, TextField, Fab } from '@material-ui/core'
import { Send as SendIcon } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux';
import { setNotify } from '../../features/notify/NotifySlice';
import MySocket from '../../defines/Socket/MySocket';
import { authUser } from '../../features/auth/authSlice';
import { conversation } from '../../features/chat/ChatSlice';
import Message from '../../defines/Message';
import { useHistory } from 'react-router-dom';
import { isNewChatEnable, newChatReceivers } from '../../features/NewChat/NewChatSlice';

let myTimeoutObj;
export default function SendingInput() {
    const [inputMsg, setInputMsg] = useState('');
    const [isTyping, setTyping] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(authUser);
    const convo = useSelector(conversation);
    const receivers = useSelector(newChatReceivers);
    const newChatEnabled = useSelector(isNewChatEnable);

    // INPUT CHANGE
    const onInputChange = (e) => {
        setInputMsg(e.target.value);
    }

    // ON SENDING MESSAGE
    const onSendingMessage = (e) => {
        e.preventDefault();
        if (convo._id) {
            if (inputMsg.trim() === '') {
                // INVALID
                dispatch(setNotify({ message: Message.PleaseTypeMessage, open: true, timeout: 2000 }));
            } else {
                //MySocket.emitSendMessage(user, inputMsg);
                MySocket.emitSendMessage(user, inputMsg, convo._id);
                setInputMsg('');
            }
            if (newChatEnabled) history.replace(`/chat/t/${convo._id}`)
        } else {
            if (newChatEnabled && receivers.length > 0) {
                console.log('sending new message to receiver', receivers);
            } else {
                alert('nothing');
            }
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
