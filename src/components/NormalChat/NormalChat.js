import { Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ConversationApi from '../../defines/https/ConversationApi';
import Socket from '../../defines/Socket';
import MySocket from '../../defines/Socket/MySocket';
import SocketEventName from '../../defines/Socket/SocketEventName';
import { authUser, authUserId } from '../../features/auth/authSlice';
import { appendMessage, conversation, conversationError, conversationMessages, conversationStatus, fetchConversationById, fetchConversationByMemberIds, fetchHomeConversation, reset } from '../../features/chat/ChatSlice';
import { isNewChatEnable, newChatReceiver } from '../../features/NewChat/NewChatSlice';
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
    const history = useHistory();
    const loggedUserId = useSelector(authUserId);
    const { conversationId } = useParams();;
    const receiver = useSelector(newChatReceiver) || {};
    const newChatEnabled = useSelector(isNewChatEnable);

    // FETCH CONVERSATION BY FRIEND ID
    useEffect(() => {
        if (newChatEnabled) {
            if (receiver._id) dispatch(fetchConversationByMemberIds([`${loggedUserId}`, `${receiver._id}`]));
            else {
                dispatch(reset());
            }
        }
    }, [receiver._id, newChatEnabled])

    useEffect(() => {
        if (status === 'succeeded') {
            if (convo._id) MySocket.emitJoinRoom(`${convo._id}_current`);
            else history.replace('/chat/new');
        }
        return () => {
            if (convo._id) MySocket.emitLeaveRoom(`${convo._id}_current`);
        }
    }, [status, convo._id])

    // FETCH CONVERSATION BY ID
    useEffect(() => {
        if (conversationId) dispatch(fetchConversationById(conversationId))
    }, [conversationId]);

    // reset
    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    }, [])

    // SOCKET EVENTS RECEIVE MESSAGE
    useEffect(() => {
        MySocket.onReceiveMessage((data) => {
            const { conversationId, message } = data;
            if (conversationId === convo._id) {
                const messageObj = {
                    type: 'message',
                    ...message
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
            {status === 'loading'
                ? <Loading></Loading>
                :
                (
                        <Messages messages={messages}></Messages>
                )
            }
        </React.Fragment>
    )
}