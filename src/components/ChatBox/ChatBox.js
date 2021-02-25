import React, { useEffect, useState } from 'react'
import SendingInput from '../SendingInput/SendingInput';
import { Divider } from '@material-ui/core';
import Messages from '../Messages/Messages';
import UserTyping from '../UserTyping/UserTyping';
import { useHistory, useParams } from 'react-router-dom';
import ChatControl from '../ChatControl/ChatControl';


export default function ChatBox({ children }) {
    const [loaded] = useState(true);
    const params = useParams();
    const history = useHistory();
    const [display, setDisplay] = useState('chat');

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
        <React.Fragment >
            <div style={{ position: 'relative', }}>
                {
                    display === 'chat'
                        ?
                        <div>
                            <ChatControl></ChatControl>
                        </div>
                        : null
                }
                <div style={{ position: 'absolute', bottom: '100px', left: '5px', width: '100%' }}>
                    <UserTyping></UserTyping>
                </div>
                <Divider />
                <SendingInput></SendingInput>
            </div>
        </React.Fragment >
    )

    return (
        <React.Fragment> { loaded ? mainHtml : children} </React.Fragment>
    )
}
