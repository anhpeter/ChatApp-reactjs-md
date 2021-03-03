import { Box, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { resetNewChat, setNewChatEnabled } from '../../features/NewChat/NewChatSlice';
import NormalChat from '../NormalChat/NormalChat';
import Receiver from '../Receiver/Receiver';

export default function NewChat() {
    const [friendId, setFriendId] = useState(null);
    const dispatch = useDispatch();
    const onFriendIdSelected = (id) => {
        setFriendId(id);
    }

    useEffect(() => {
        dispatch(setNewChatEnabled(true));
        return () => {
            console.log('reset new chat')
            dispatch(resetNewChat());
        }
    }, [])

    return (
        <Box position="relative">
            {/* INPUT */}
            <Paper style={{ position: 'absolute', zIndex: '1000', width: '100%', boxShadow: 'none' }}>
                <Receiver onFriendIdSelected={onFriendIdSelected}></Receiver>
            </Paper>

            {/* CHAT AREA */}
            <Box>
                <NormalChat friendId={friendId} type="temp"></NormalChat>
            </Box>
        </Box >
    )
}
