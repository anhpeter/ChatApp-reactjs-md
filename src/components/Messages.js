import React from 'react'
import {List} from '@material-ui/core'
import Message from './Message'
import mainStyle from '../defines/styles/MainStyles'

export default function Messages() {
    const classes = mainStyle();
    return (
        <List className={classes.messageArea}>
            <Message position="right" message="Hello, how are you?" time="09:30 am"></Message>
            <Message position="left" message="I'm fine, thank you." time="09:33 am"></Message>
            <Message position="right" message="Bye!" time="09:35 am"></Message>
        </List>
    )
}
