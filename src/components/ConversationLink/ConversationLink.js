import { Box } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Helper from '../../defines/Helper';
import ConversationApi from '../../defines/https/ConversationApi';
import { authUser } from '../../features/auth/authSlice';
import { conversationMemberIds } from '../../features/chat/ChatSlice';

export default function ConversationLink({ children, item, ...rest }) {
    const history = useHistory();
    const user = useSelector(authUser) || {};
    const convoMemberIds = useSelector(conversationMemberIds);
    const onItemClick = async () => {
        const showConversation = async () => {
            const data = await ConversationApi.findConversationInfoByUserIdsOrCreateIfNotExist([user._id, item._id]); if (data.status === 'succeeded') {
                const { _id } = data.payload;
                history.push(`/chat/t/${_id}`);
            }
        }
        if (!convoMemberIds) await showConversation();
        else if (Helper.arrayDiff(convoMemberIds, [user._id, item._id]).length > 0) await showConversation();
    }
    return (
        <Box {...rest} onClick={onItemClick}> {children}</Box>
    )
}
