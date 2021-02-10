import React, { useState } from 'react'
import SendingInput from '../SendingInput/SendingInput';
import { Divider } from '@material-ui/core';
import Messages from '../Messages/Messages';


export default function ChatBox({ children }) {
    const [loaded] = useState(true);
    //setTimeout(() => {
    //setLoaded(true);
    //}, 0);

    return (
        <div>
            {loaded ?
                <React.Fragment>
                    <Messages></Messages>
                    <Divider />
                    <SendingInput></SendingInput>
                </React.Fragment>
                : children
            }
        </div>
    )
}
