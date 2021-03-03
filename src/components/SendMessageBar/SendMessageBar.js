import React from 'react'
import SendingInput from '../SendingInput/SendingInput'

export default function SendMessageBar({type}) {
    return (
        <React.Fragment>
            <SendingInput type={type}></SendingInput>
        </React.Fragment>
    )
}
