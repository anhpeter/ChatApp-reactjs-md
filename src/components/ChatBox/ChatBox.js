import { Box, Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { conversationStatus } from '../../features/chat/ChatSlice';
import NewChat from '../NewChat/NewChat';
import NormalChat from '../NormalChat/NormalChat';
import SendMessageBar from '../SendMessageBar/SendMessageBar';
import UserTyping from '../UserTyping/UserTyping';


export default function ChatBox({ children }) {
    const [loaded] = useState(true);
    const params = useParams();
    const history = useHistory();
    const [display, setDisplay] = useState(null);
    const convoStatus = useSelector(conversationStatus);

    useEffect(() => {
        const { type, conversationId } = params;
        if (type) {
            switch (type) {
                case 't':
                    if (!conversationId) history.replace('/chat');
                    setDisplay('chat');
                    break;
                case 'new':
                    if (conversationId) history.replace('/chat/new');
                    setDisplay('new');
                    break;
                default:
                    break;
            }
        } else {
            //home chat
            setDisplay('chat');

        }
        return () => {
        }
    }, [params])

    const mainHtml = (
        <Box className="chat-box-wrapper">
            {
                display === 'chat'
                    ?
                    <NormalChat></NormalChat>
                    : <NewChat></NewChat>
            }
            <div style={{ position: 'absolute', bottom: '100px', left: '5px', width: '100%' }}>
                <UserTyping></UserTyping>
            </div>
            <Box display={convoStatus === 'loading' ? 'none' : 'unset'}>
                <SendMessageBar></SendMessageBar>
            </Box>
        </Box>
    )

    return (
        <React.Fragment> { loaded ? mainHtml : children} </React.Fragment>
    )
}
