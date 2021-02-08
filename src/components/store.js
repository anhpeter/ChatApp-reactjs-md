import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import ChatSlice from '../features/chat/ChatSlice'
import NotifySlice from '../features/notify/NotifySlice'

export default configureStore({
    reducer: {
        chat: ChatSlice,
        notify: NotifySlice,
        auth: authSlice,
    }
})