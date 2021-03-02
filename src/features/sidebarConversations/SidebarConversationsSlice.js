import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import ConversationApi from '../../defines/https/ConversationApi';

export const fetchConversations = createAsyncThunk('sidebarConversations/fetchConversations', async ({ id }) => {
    const response = await ConversationApi.listConversationsForListDisplay(id)
    return response;
})

export const fetchAndPrependConversationById = createAsyncThunk('sidebarConversations/fetchAndPrependConversationById', async ({ id }) => {
    const response = await ConversationApi.findSidebarConversationById(id)
    return response;
})

const conversationsAdapter = createEntityAdapter({
    selectId: item => item._id,
    sortComparer: (a, b) => -(a.lastMessage.time - b.lastMessage.time)
})

const initialState = conversationsAdapter.getInitialState({
    status: 'idle',
    error: null
})


const SidebarConversationsSlice = createSlice({
    name: 'sidebarConversations',
    initialState,
    reducers: {
        updateLastMessage: (state, action) => {
            const { id, message } = action.payload;
            const item = state.entities[id];
            if (item) {
                item.lastMessage = message;
                conversationsAdapter.upsertOne(state, item)
            } else {
                fetchAndPrependConversationById({ id });
            }
        }
    },
    extraReducers: {
        [fetchAndPrependConversationById.fulfilled]: (state, action) => {
            const { payload, status } = action.payload;
            if (status === 'succeeded') conversationsAdapter.upsertOne(state, payload);
        },
        [fetchConversations.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchConversations.fulfilled]: (state, action) => {
            const { payload, status } = action.payload;
            if (status === 'succeeded') {
                conversationsAdapter.upsertMany(state, payload)
                state.error = null;
            } else state.error = 'not found';
            state.status = 'succeeded'
        },

    }

});

const selectors = {
    isConversationExist: (state, id) => {
        return (state.sidebarConversations.ids.indexOf(id) > -1)
    }
}

export const { isConversationExist } = selectors;
export const {
    selectAll: selectAllSidebarConversations,
    selectById: selectSidebarConversationById,
    selectIds: selectSidebarConversationIds
    // Pass in a selector that returns the posts slice of state
} = conversationsAdapter.getSelectors(state => state.sidebarConversations)


export const {
    updateLastMessage
} = SidebarConversationsSlice.actions
export default SidebarConversationsSlice.reducer