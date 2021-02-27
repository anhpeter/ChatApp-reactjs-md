import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import UserApi from '../../defines/https/UserApi';
import MySocket from '../../defines/Socket/MySocket';

export const loginThunk = createAsyncThunk('auth/login', async ({ username, password, }) => {
    const response = await UserApi.findByUsernameAndPassword(username, password);
    return response;
})

export const sentFriendRequestThunk = createAsyncThunk('auth/sentFriendRequest', async ({ id, friendId, }) => {
    const response = await UserApi.sentFriendRequest(id, friendId);
    return response;
})

const initialState = {
    isLogged: false,
    user: null,
    status: 'idle',
    error: null,
}

const loginWithUser = (state, action) => {
    MySocket.emitSignIn(action.payload);
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
        updateUser: (state, action) => {
            state.user = action.payload;
        },
        signOut: (state) => {
            state.user = null;
            state.isLogged = false;
        }
    },
    extraReducers: {
        // LOGIN
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
        },

        // FRIENDS
        [sentFriendRequestThunk.fulfilled]: (state, action) => {
        },

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
    signOut, login, updateUser
} = authSlice.actions

export default authSlice.reducer