import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Socket from '../../defines/Socket';
import MySocket from '../../defines/Socket/MySocket';
import SocketEventName from '../../defines/Socket/SocketEventName';
import { loggedUser } from '../../features/auth/authSlice';
import { conversation, conversationError, conversationStatus, fetchConversationById, fetchHomeConversation } from '../../features/chat/ChatSlice';
import Messages from '../Messages/Messages';

export default function ChatControl() {
    const [messages,
        setMessages] = useState([]);
    const status = useSelector(conversationStatus);
    const error = useSelector(conversationError);
    const convo = useSelector(conversation);
    const history = useHistory();
    const user = useSelector(loggedUser);
    const dispatch = useDispatch();
    const { type, conversationId } = useParams();;

    useEffect(() => {
        console.log('status change');
        if (status === 'succeeded') {
            if (!error) {
                setMessages(convo.messages);
            } else history.replace('/chat/new')
        }
    }, [status])

    // FETCH CONVERSATION
    useEffect(() => {
        if (type === 't') {
            dispatch(fetchConversationById(conversationId))
        } else {
            // new
        }
        return () => { }
    }, [type, conversationId]);

    // SOCKET EVENTS
    useEffect(() => {


        MySocket.onReceiveMessage((data) => {
            console.log('receive message', data);
            const messageObj = {
                type: 'message',
                ...data
            }
            setMessages(messages.concat(messageObj))
        })

        return () => {
            MySocket.off(SocketEventName.receiveMessage);
        }
    }, [setMessages, messages])
    return (
        <React.Fragment>
            <Messages messages={messages}></Messages>
        </React.Fragment>
    )
}