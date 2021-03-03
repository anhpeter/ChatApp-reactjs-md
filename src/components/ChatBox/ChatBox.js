import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import NewChat from '../NewChat/NewChat';
import NormalChat from '../NormalChat/NormalChat';


export default function ChatBox({ children }) {
    const [loaded] = useState(true);
    const params = useParams();
    const history = useHistory();
    const [display, setDisplay] = useState(null);

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
            {
                display === 'chat'
                    ?
                    <NormalChat></NormalChat>
                    : <NewChat></NewChat>
            }
        </React.Fragment >
    )

    return (
        <React.Fragment> { loaded ? mainHtml : children} </React.Fragment>
    )
}
