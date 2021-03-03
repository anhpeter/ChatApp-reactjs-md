import { Box, Typography } from '@material-ui/core';
import React from 'react'
import ReceiverInput from '../ReceiverInput/ReceiverInput';

export default function NewChat() {
    return (
        <Box>
            {/* INPUT */}
            <Box >
                <ReceiverInput></ReceiverInput>

            </Box>

            {/* CHAT AREA */}
            <Box>

            </Box>
        </Box >
    )
}
