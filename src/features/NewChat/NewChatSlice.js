import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    enabled: false,
    receivers: [],
}

const NewChatSlice = createSlice({
    name: 'newChat',
    initialState,
    reducers: {
        setEnabled: (state, action) => {
            state.enabled = action.payload;
        },
        removeReceiverById: (state, action) => {
            state.receivers = state.receivers.filter((item) => {
                return item._id !== action.payload;
            })
        },
        appendReceiver: (state, action) => {
            state.receivers.push(action.payload);
        },
        removeLastReceiver: (state, action) => {
            if (state.receivers.length > 0) {
                state.receivers = (state.receivers.slice(0, -1));
            }
        },
        reset: (state, action) => {
            console.log('initi', initialState)
            state.enabled = initialState.enabled;
            state.receivers = initialState.receivers;
        }
    }
});

const selectors = {
    isNewChatEnable: (state) => {
        return state.newChat.enabled
    },
    newChatReceivers: (state) => {
        return state.newChat.receivers
    },
    newChatReceiver: (state) => {
        if (state.newChat.receivers.length === 1) return state.newChat.receivers[0];
        return null;
    }
}

export const { newChatReceivers, isNewChatEnable, newChatReceiver } = selectors;

export const {
    removeReceiverById: removeNewChatReceiverById,
    appendReceiver: appendNewChatReceiver,
    removeLastReceiver: removeLastNewChatReceiver,
    setEnabled: setNewChatEnabled,
    reset: resetNewChat,
} = NewChatSlice.actions
export default NewChatSlice.reducer