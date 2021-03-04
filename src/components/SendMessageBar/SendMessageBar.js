import { Box, Paper } from '@material-ui/core'
import React from 'react'
import SendingInput from '../SendingInput/SendingInput'

export default function SendMessageBar({ type }) {
    return (
        <Paper style={{boxShadow:'none'}} className="sending-message-bar-wrapper">
            <SendingInput type={type}></SendingInput>
        </Paper>
    )
}
