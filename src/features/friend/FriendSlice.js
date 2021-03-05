import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import UserApi from '../../defines/https/UserApi';

// THUNKS
export const fetchFriends = createAsyncThunk('friend/fetchFriends', async ({ type, id }) => {
    const response = await UserApi.findFriends(type, id);
    return { type, response };
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
}

// SLICE
const FriendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchFriends.pending]: (state, action) => {
            const { type } = action.payload;
            const currentState = state[type];
            currentState.status = 'loading'
        },
        [fetchFriends.fulfilled]: (state, action) => {
            const { type, response } = action.payload;
            const { payload, status } = response;
            const currentState = state[type];
            if (status === 'succeeded') {
                adapter.upsertMany(currentState, payload)
                currentState.error = null;
            } else currentState.error = 'not found';
            currentState.status = 'succeeded'
        },
    }
});

const selectors = {

}

export const {

} = FriendSlice.actions
export default FriendSlice.reducer