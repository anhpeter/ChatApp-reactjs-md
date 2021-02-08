import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '',
    type: 'info',
    open: false,
    timeout: 6000,
}

const NotifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        setNotify: (state, action) => {
            const { message, type, open, timeout } = action.payload;
            if (open) {
                state.message = message || '';
                state.type = type || 'info';
                state.timeout = timeout || 6000;
            }
            state.open = open || false;
        }
    }
})

const selectors = {
    open: (state) => {
        return state.notify.open;
    },
    message: (state) => {
        return state.notify.message;
    },
    type: (state) => {
        return state.notify.type;
    },
    timeout: (state) => {
        return state.notify.timeout;
    },
};
export const { open, message, type, timeout } = selectors;

export const {
    setNotify
} = NotifySlice.actions
export default NotifySlice.reducer;