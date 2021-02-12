import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Axios from 'axios';
import { API_ADDRESS } from '../../defines/Config';
import MySocket from '../../defines/MySocket';
import Socket from '../../defines/Socket';

export const loginThunk = createAsyncThunk('auth/login', async ({ username, password, }) => {
    const response = await Axios.post(`${API_ADDRESS}/user/login`, { username, password })
    return response.data;
})

const initialState = {
    isLogged: false,
    user: null,
    status: 'idle',
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: (state) => {
            MySocket.emitLeave(state.user);
            state.user = null;
            state.isLogged = false;
        }
    },
    extraReducers: {
        [loginThunk.pending]: (state, action) => {
            state.status = 'loading'
        },
        [loginThunk.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            const { data, status } = action.payload;
            if (status === 'success') {
                MySocket.emitConnected(data.user);
                state.user = data.user;
                state.isLogged = true;
            } else {
                state.error = 'not found';
            }
        },
        [loginThunk.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }

    }
});

const selectors = {
    isLogged: (state) => {
        return state.auth.isLogged;
    },
    loggedUser: (state) => {
        return state.auth.user;
    },
    status: (state) => {
        return state.auth.status;
    }
}

export const { status, isLogged, loggedUser } = selectors;


export const {
    signOut
} = authSlice.actions

export default authSlice.reducer