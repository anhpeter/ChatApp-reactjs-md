import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogged: false,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            const { user } = action.payload;
            console.log(state, action.payload);
            if (user != null) {
                state.user = user;
                state.isLogged = true;
            } else {
                state.user = null;
                state.isLogged = false;
            }
        },
        signOut: (state) => {
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