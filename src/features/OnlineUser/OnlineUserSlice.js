import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const adapter = createEntityAdapter({
    selectId: item => item._id,
})

const initialState = adapter.getInitialState({
    status: 'idle',
    error: null
})

const OnlineUserSlice = createSlice({
    name: 'onlineUser',
    initialState,
    reducers: {
        addAll: (state, action) => {
            adapter.addMany(state, action.payload);
        },
        removeOne: (state, action) => {
            adapter.removeOne(state, action.payload._id);
        },
        addOne: (state, action) => {
            adapter.addOne(state, action.payload);
        },
    },
});

export const {
    selectAll: selectAllOnlineUser,
    selectById: selectOnlineUserById,
    selectIds: selectOnlineUserIds
    // Pass in a selector that returns the posts slice of state
} = adapter.getSelectors(state => state.onlineUser)

export const {
    addAll: addAllOnlineUser,
    addOne: addOneOnlineUser,
    removeOne: removeOneOnlineUser
} = OnlineUserSlice.actions
export default OnlineUserSlice.reducer