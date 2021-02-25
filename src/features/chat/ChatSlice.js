import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ConversationApi from '../../defines/https/ConversationApi';

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
    conversation: null,
    status: 'idle',
    error: null,
}

const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.conversation = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: {
        'chat/conversation/pending': (state, action) => {
            state.status = 'loading'
        },
        'chat/conversation/fulfilled': (state, action) => {
            state.status = 'succeeded'
            const { payload, status } = action.payload;

            if (status === 'succeeded') {
                state.conversation = payload;
                state.error = null;
            } else state.error = 'not found';
        },
        'chat/conversation/rejected': (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
    }
});

const selectors = {
    conversation: (state) => {
        return state.chat.conversation;
    },
    conversationStatus: (state) => {
        return state.chat.status;
    },
    conversationError: (state) => {
        return state.chat.error;
    },
    memberIds: (state) => {
        return state.chat.conversation.members;
    }
}

export const { conversationStatus, conversationError, conversation, members: conversationMembers } = selectors;

export default ChatSlice.reducer;