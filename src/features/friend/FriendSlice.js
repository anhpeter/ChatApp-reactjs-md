import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import UserApi from '../../defines/https/UserApi';

// THUNKS
export const fetchFriendsByIds = createAsyncThunk('friend/fetchFriends', async ({ type, ids }) => {
    const response = await UserApi.findUsersByIds(ids);
    return { type, response };
})

export const fetchStrangersByUsername = createAsyncThunk('friend/fetchFriends', async ({ username }) => {
    const response = await UserApi.findStrangerByUsername(username);
    return { type: 'stranger', response };
})

// ENTITY ADAPTER
const adapter = createEntityAdapter({
    selectId: item => item._id,
})

// INITIAL STATE
const itemsInitialState = adapter.getInitialState({
    status: 'idle',
    error: null
})

const initialState = {
    friend: itemsInitialState,
    request: itemsInitialState,
    sent_request: itemsInitialState,
    stranger: itemsInitialState,
}

// SLICE
const FriendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        // current user
        onAddFriend: (state, action) => {
            const { user } = action.payload;
            adapter.removeOne(state.stranger, user._id);
            adapter.addOne(state.sent_request, user);
        },
        onUnFriend: (state, action) => {
            const { user } = action.payload;
            adapter.removeOne(state.friend, user._id);
            adapter.addOne(state.stranger, user);
        },
        onCancelFriendRequest: (state, action) => {
            const { user } = action.payload;
            adapter.removeOne(state.sent_request, user._id);
            adapter.addOne(state.stranger, user);
        },
        onRejectFriendRequest: (state, action) => {
            const { user } = action.payload;
            adapter.removeOne(state.request, user._id);
            adapter.addOne(state.stranger, user);
        },
        onAcceptFriendRequest: (state, action) => {
            const { user } = action.payload;
            adapter.removeOne(state.request, user._id);
            adapter.addOne(state.friend, user);
        },

        // friend
        onFriendRequested: (state, action) => {
            const { user } = action.payload;
            adapter.removeOne(state.stranger, user._id);
            adapter.addOne(state.request, user);
        },
        onFriendAccepted: (state, action) => {
            const { user } = action.payload;
            adapter.removeOne(state.sent_request, user._id);
            adapter.addOne(state.friend, user);
        },
        onFriendUnfriend: (state, action) => {
            const { user } = action.payload;
            adapter.removeOne(state.friend, user._id);
            adapter.addOne(state.stranger, user);
        },
        onFriendCanceled: (state, action) => {
            const { user } = action.payload;
            adapter.removeOne(state.request, user._id);
            adapter.addOne(state.stranger, user);
        },
        onFriendRejected: (state, action) => {
            const { user } = action.payload;
            adapter.removeOne(state.sent_request, user._id);
            adapter.addOne(state.stranger, user);
        },
    },
    extraReducers: {
        // fetch friends
        [fetchFriendsByIds.pending]: (state, action) => {
            const { type } = action.meta.arg;
            const currentState = state[type];
            currentState.status = 'loading'
        },
        [fetchFriendsByIds.fulfilled]: (state, action) => {
            const { type, response } = action.payload;
            const { payload, status } = response;
            const currentState = state[type];
            if (status === 'succeeded') {
                adapter.upsertMany(currentState, payload)
                currentState.error = null;
            } else currentState.error = 'not found';
            currentState.status = 'succeeded'
        },
        [fetchFriendsByIds.rejected]: (state, action) => {
        }
    }
});

// SELECTORS
const selectors = {
    friendStatus: (state, type) => {
        return state.friend[type].status;
    },
    friendError: (state, type) => {
        return state.friend[type].error;
    }
}

export const { friendStatus } = selectors;

export const {
    selectAll: selectAllFriend,
    selectById: selectFriendById,
    selectIds: selectFriendIds
    // Pass in a selector that returns the posts slice of state
} = adapter.getSelectors(state => state.friend.friend)

export const {
    selectAll: selectAllRequest,
    selectById: selectRequestById,
    selectIds: selectRequestIds
    // Pass in a selector that returns the posts slice of state
} = adapter.getSelectors(state => state.friend.request)

export const {
    selectAll: selectAllSentRequest,
    selectById: selectSentRequestById,
    selectIds: selectSentRequestIds
    // Pass in a selector that returns the posts slice of state
} = adapter.getSelectors(state => state.friend.sent_request)

export const {
    selectAll: selectAllStranger,
    selectById: selectStrangerById,
    selectIds: selectStrangerIds
    // Pass in a selector that returns the posts slice of state
} = adapter.getSelectors(state => state.friend.stranger)

export const {
    onFriendRequested,
    onFriendAccepted,
    onFriendCanceled,
    onFriendRejected,
    onFriendUnfriend,
    onAcceptFriendRequest,
    onAddFriend,
    onCancelFriendRequest,
    onRejectFriendRequest,
    onUnFriend
} = FriendSlice.actions
export default FriendSlice.reducer