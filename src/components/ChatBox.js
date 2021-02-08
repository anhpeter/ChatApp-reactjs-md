import React from 'react'
import SendingInput from './SendingInput';
import { Divider } from '@material-ui/core';
import Messages from './Messages';


export default function ChatBox() {
    return (
        <div>
            <Messages></Messages>
            <Divider />
            <SendingInput></SendingInput>
        </div>
    )
}
