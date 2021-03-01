import { Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Socket from '../../defines/Socket';
import MySocket from '../../defines/Socket/MySocket';
import SocketEventName from '../../defines/Socket/SocketEventName';
import { authUser } from '../../features/auth/authSlice';
import { appendMessage, conversation, conversationError, conversationMessages, conversationStatus, fetchConversationById, fetchHomeConversation, reset } from '../../features/chat/ChatSlice';
import { updateLastMessage } from '../../features/sidebarConversations/SidebarConversationsSlice';
import Loading from '../Loading/Loading';
import Messages from '../Messages/Messages';
import SendMessageBar from '../SendMessageBar/SendMessageBar';
import UserTyping from '../UserTyping/UserTyping';

export default function NormalChat() {
    const status = useSelector(conversationStatus);
    const messages = useSelector(conversationMessages);
    const convo = useSelector(conversation);
    const dispatch = useDispatch();
    const { conversationId } = useParams();;

    useEffect(() => {
        if (status === 'succeeded') {
            if (convo._id) MySocket.emitJoinRoom(`${convo._id}_current`);
        }
        return () => {
            if (convo._id) MySocket.emitLeaveRoom(`${convo._id}_current`);
        }
    }, [status, convo._id])

    // FETCH CONVERSATION
    useEffect(() => {
        dispatch(fetchConversationById(conversationId))
        return () => {
            dispatch(reset())
        }
    }, [conversationId]);

    // SOCKET EVENTS RECEIVE MESSAGE
    useEffect(() => {
        MySocket.onReceiveMessage((data) => {
            if (data.conversationId === convo._id) {
                const messageObj = {
                    type: 'message',
                    ...data
                }
                dispatch(appendMessage(messageObj));
            }
        })

        return () => {
            MySocket.off(SocketEventName.receiveMessage);
        }
    }, [messages, convo._id])

    return (
        <React.Fragment>
            <div style={{ position: 'relative', }}>
                {status === 'loading'
                    ? <Loading></Loading>
                    :
                    (
                        <React.Fragment>
                            <Messages messages={messages}></Messages>
                            <div style={{ position: 'absolute', bottom: '100px', left: '5px', width: '100%' }}>
                                <UserTyping></UserTyping>
                            </div>
                            <Divider />
                            <SendMessageBar></SendMessageBar>
                        </React.Fragment>
                    )
                }
            </div>
        </React.Fragment>
    )
}