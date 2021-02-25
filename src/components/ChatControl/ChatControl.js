import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Socket from '../../defines/Socket';
import MySocket from '../../defines/Socket/MySocket';
import SocketEventName from '../../defines/Socket/SocketEventName';
import { loggedUser } from '../../features/auth/authSlice';
import { conversation, conversationStatus, fetchConversationById, fetchHomeConversation } from '../../features/chat/ChatSlice';
import Messages from '../Messages/Messages';

export default function ChatControl() {
    const [messages,
        setMessages] = useState([]);
    const status = useSelector(conversationStatus);
    const convo = useSelector(conversation);
    const user = useSelector(loggedUser);
    const dispatch = useDispatch();
    const { type, conversationId } = useParams();;

    useEffect(() => {
        if (status === 'succeeded') {
            setMessages(convo.messages);
        }
    }, [status, convo])

    // FETCH CONVERSATION
    useEffect(() => {
        if (type === 't') {
            dispatch(fetchConversationById(conversationId))
        } else {
            dispatch(fetchHomeConversation())
        }
        return () => { }
    }, [type, conversationId]);

    // SOCKET EVENTS
    useEffect(() => {
        MySocket.onReceiveMessage((data) => {
            const messageObj = {
                type: 'message',
                ...data
            }
            setMessages(messages.concat(messageObj))
        })

        return () => {
            MySocket.off(SocketEventName.receiveMessage);
            MySocket.emitUserLeaveRoom(user, conversationId)
        }
    }, [setMessages, messages])
    return (
        <React.Fragment>
            <Messages messages={messages}></Messages>
        </React.Fragment>
    )
}

// MySocket.onNewJoiner((data) => { let t = (data.user.username ===
// user.username) ? 'current-user' : 'other-user' const obj = { type:
// `welcome-${t}-notification`, ...data, } setMessages(messages.concat(obj))
// scroll(); }) MySocket.onUserLeft((data) => { const obj = { type:
// 'user-left-notification', ...data, } setMessages(messages.concat(obj))
//Socket.off(SocketEventName.newJoiner); Socket.off(SocketEventName.userLeft);