import React from 'react'
import ConversationItem from '../ConversationItem/ConversationItem'
import RouterLink from '../RouterLink/RouterLink'
import HomeIcon from '@material-ui/icons/Home';

export default function HomeConversationItem() {
    return (
        <RouterLink to="/chat">
            <ConversationItem name="Home" icon={<HomeIcon></HomeIcon>} lastMessage="..."></ConversationItem>
        </RouterLink>
    )
}
