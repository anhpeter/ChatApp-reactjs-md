import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ConversationApi from '../../defines/https/ConversationApi';

export const fetchConversationByMemberIds = createAsyncThunk('chat/conversation', async (ids) => {
    const response = await ConversationApi.findConversationByMemberIds(ids);
    return response;
})

export const fetchConversationById = createAsyncThunk('chat/conversation', async (id) => {
    const response = await ConversationApi.findConversationById(id);
    return response;
})

export const fetchConversationByUserIdsOrCreateIfNotExist = createAsyncThunk('chat/conversation', async (ids) => {
    const response = await ConversationApi.findConversationByUserIdsOrCreateIfNotExist(ids);
    return response;
})

export const fetchHomeConversation = createAsyncThunk('chat/conversation', async () => {
    const response = await ConversationApi.getHomeConversation();
    return response;
})

const initialState = {
    conversation: {},
    sidebarConversations: [],
    status: 'idle',
    error: null,
}

const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        appendMessage: (state, action) => {
            state.conversation.messages.push(action.payload);
        },
        reset: (state, action) => {
            state.conversation = {};
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: {
        'chat/conversation/pending': (state, action) => {
            state.status = 'loading'
        },
        'chat/conversation/fulfilled': (state, action) => {
            const { payload, status } = action.payload;

            if (status === 'succeeded') {
                state.conversation = payload;
                state.error = null;
            } else state.error = 'not found';
            state.status = 'succeeded'
        },
        'chat/conversation/rejected': (state, action) => {
            state.error = action.error.message
            state.status = 'failed'
        },
    }
});

const selectors = {
    conversation: (state) => {
        return state.chat.conversation;
    },
    conversationMessages: (state) => {
        return state.chat.conversation.messages || [];
    },
    conversationId: (state) => {
        return state.chat.conversation._id;
    },
    conversationStatus: (state) => {
        return state.chat.status;
    },
    conversationError: (state) => {
        return state.chat.error;
    },
    conversationMemberIds: (state) => {
        return state.chat.conversation.members;
    }
}

export const { conversationStatus, conversationError, conversation, conversationMemberIds, conversationId, conversationMessages } = selectors;

export const { reset, appendMessage } = ChatSlice.actions

export default ChatSlice.reducer;