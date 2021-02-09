import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: 'light',
}

const themeSLice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchThemeType: (state) => {
            state.type = (state.type === 'light') ? 'dark' : 'light';
        }
    }
});

export const {
    switchThemeType
} = themeSLice.actions
export default themeSLice.reducer