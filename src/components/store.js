import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import ChatSlice from '../features/chat/ChatSlice'
import NewChatSlice from '../features/NewChat/NewChatSlice'
import NotifySlice from '../features/notify/NotifySlice'
import SidebarConversationsSlice from '../features/sidebarConversations/SidebarConversationsSlice'
import themeSlice from '../GeneralSlices/themeSlice'

export default configureStore({
    reducer: {
        chat: ChatSlice,
        notify: NotifySlice,
        auth: authSlice,
        sidebarConversations: SidebarConversationsSlice,
        newChat: NewChatSlice,
        theme: themeSlice,
    }
})