import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import Header from './components/Header/Header'
import Chat from './features/chat/Chat'
import { BrowserRouter as Router, Switch, Redirect, HashRouter } from 'react-router-dom'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Notify from './features/notify/Notify'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { authUser, loginThunk, updateUser } from './features/auth/authSlice'
import { conversationId } from './features/chat/ChatSlice'
import { LOGGED_USER } from './defines/CookieName';
import { Box, Paper } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Friends from './components/Friends/Friends';
import AuthRoute from './components/AuthRoute/AuthRoute';
import MySocket from './defines/Socket/MySocket';
import SocketEventName from './defines/Socket/SocketEventName';
import { setNotify } from './features/notify/NotifySlice';
import { onFriendUnfriend, onFriendRejected, onFriendCanceled, onFriendAccepted, onFriendRequested } from './features/friend/FriendSlice';
import Helper from './defines/Helper';
import Message from './defines/Message';

function useWindowSize() {
    window.addEventListener('scroll', () => {
        window.scrollTo(0, 0);
    })
}


export default function App() {
    //useWindowSize();
    const [cookies] = useCookies([LOGGED_USER]);
    const user = useSelector(authUser) || {};
    const convoId = useSelector(conversationId);
    const dispatch = useDispatch();

    useEffect(() => {
        const setupFriendEvents = () => {
            MySocket.onFriendAccepted((data) => {
                dispatch(setNotify({ message: Helper.format(Message.friendAccepted, data.user.username,), type: 'info', open: true }));
                dispatch(onFriendAccepted({ user: data.user }))
            })
            MySocket.onFriendRequested((data) => {
                dispatch(setNotify({ message: Helper.format(Message.friendRequested, data.user.username,), type: 'info', open: true }));
                dispatch(onFriendRequested({ user: data.user }))
            })
            MySocket.onFriendUnFriend((data) => {
                dispatch(onFriendUnfriend({ user: data.user }))
            })
            MySocket.onFriendRequestCanceled((data) => {
                dispatch(onFriendCanceled({ user: data.user }))
            })
            MySocket.onFriendRejected((data) => {
                dispatch(onFriendRejected({ user: data.user }))
            })
        }
        setupFriendEvents();
        MySocket.onUpdateUser((data) => {
            console.log('update user run')
            dispatch(updateUser(data))
        })

        MySocket.onNewMessageNotification((data) => {
            const { message, conversationId } = data;
            if (conversationId !== convoId && message.from._id !== user._id) {
                dispatch(setNotify({ message: Helper.format(Message.newMessage, message.from.username, message.text), type: 'success', open: true, timeout: 2000 }));
            }
        })
        return () => {
            MySocket.off(SocketEventName.updateUser)
            MySocket.off(SocketEventName.friendAccepted)
            MySocket.off(SocketEventName.friendRequested)
            MySocket.off(SocketEventName.friendUnfriend)
            MySocket.off(SocketEventName.friendRequestCanceled)
            MySocket.off(SocketEventName.friendRejected)
            MySocket.off(SocketEventName.newMessageNotification)
        }
    }, [user._id, convoId])

    // SIGN IN WITH COOKIE
    useEffect(() => {
        if (cookies[LOGGED_USER])
            dispatch(loginThunk(cookies[LOGGED_USER]))
    }, [])

    const themeType = useSelector((state) => {
        return state.theme.type
    });

    const theme = createMuiTheme({
        palette: {
            type: themeType
        }
    });
    return (
        <ThemeProvider theme={theme}>
            <HashRouter base="/">
                <Paper >
                    <Box className="wrapper">
                        {/* HEADER */}
                        <Header></Header>
                        <Switch>
                            {/* CONTENT */}
                            <PrivateRoute path="/chat/:type(t|new)/:conversationId?" exact> <Chat></Chat> </PrivateRoute>
                            <PrivateRoute path={`/:friendsTab(friends|friends_all|friends_request|friends_sent_request|people_may_know)`} ><Friends></Friends> </PrivateRoute>
                            <AuthRoute path="/login" exact component={SignIn}></AuthRoute>
                            <AuthRoute path="/sign-up" exact component={SignUp}></AuthRoute>
                            <Redirect to="/chat/new"></Redirect>
                        </Switch>
                        <Notify></Notify>
                    </Box>
                </Paper>
            </HashRouter>
        </ThemeProvider >
    )
}
