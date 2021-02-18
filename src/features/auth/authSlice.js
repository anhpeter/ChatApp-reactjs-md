import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Axios from 'axios';
import { API_ADDRESS } from '../../defines/Config';
import UserApi from '../../defines/https/UserApi';
import MySocket from '../../defines/MySocket';
import Socket from '../../defines/Socket';

export const loginThunk = createAsyncThunk('auth/login', async ({ username, password, }) => {
    const response = await UserApi.findByUsernameAndPassword(username, password);
    return response;
})

const initialState = {
    isLogged: false,
    user: null,
    status: 'idle',
    error: null,
}

const loginWithUser = (state, action) => {
    MySocket.emitConnected(action.payload);
    state.user = action.payload;
    state.isLogged = true;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            loginWithUser(state, action)
        },
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
            const { payload, status } = action.payload;

            if (status === 'succeeded') {
                loginWithUser(state, { payload });
                state.error = null;
            } else state.error = 'not found';
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
    },
    authError: (state) => {
        return state.auth.error;
    },
}

export const { authError, status, isLogged, loggedUser } = selectors;


export const {
    signOut, login
} = authSlice.actions

export default authSlice.reducer