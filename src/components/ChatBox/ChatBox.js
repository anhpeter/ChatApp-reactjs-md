import React, { useState } from 'react'
import SendingInput from '../SendingInput/SendingInput';
import { Divider } from '@material-ui/core';
import Messages from '../Messages/Messages';
import UserTyping from '../UserTyping/UserTyping';


export default function ChatBox({ children }) {
    const [loaded] = useState(true);
    //setTimeout(() => {
    //setLoaded(true);
    //}, 0);

    return (
        <React.Fragment>
            {
                loaded ?
                    <React.Fragment >
                        <div style={{ position: 'relative', }}>
                            <div>
                                <Messages></Messages>
                            </div>
                            <div style={{ position: 'absolute', bottom: '100px', left: '5px', width: '100%' }}>
                                <UserTyping></UserTyping>
                            </div>
                            <Divider />
                            <SendingInput></SendingInput>
                        </div>
                    </React.Fragment >
                    : children
            }
        </React.Fragment>
    )
}
