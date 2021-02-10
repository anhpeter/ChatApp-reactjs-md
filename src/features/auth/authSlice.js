import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Axios from 'axios';
import { API_ADDRESS } from '../../defines/Config';
import Socket from '../../defines/Socket';

export const login = createAsyncThunk('auth/login', async ({ username, password, }, { dispatch }) => {
    console.log('login thunk');
    const response = await Axios.post(`${API_ADDRESS}/user/login`, { username, password })
    try {
        const { data } = response;
        if (data.status === 'success') {
            const user = data.data.user;
            console.log('user', user);
            dispatch(signIn({ user }));
        }
    } catch (error) {
        console.log(error);
    }
    return response.posts
})

const initialState = {
    isLogged: false,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: {
            reducer: (state, action) => {
                const user = action.payload;
                state.user = user;
                state.isLogged = true;
            },
            prepare: (data) => {
                const { user } = data;
                Socket.emit('connected', { user });
                return {
                    payload: user,
                }
            }
        },
        signOut: (state) => {
            Socket.emit('leave', { user: state.user });
            state.user = null;
            state.isLogged = false;
        }
    }
});

const selectors = {
    isLogged: (state) => {
        return state.auth.isLogged;
    }
}

export const { isLogged } = selectors;


export const {
    signIn, signOut
} = authSlice.actions

export default authSlice.reducer