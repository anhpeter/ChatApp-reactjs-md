import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import Header from './components/Header/Header'
import Chat from './features/chat/Chat'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Notify from './features/notify/Notify'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { loggedUser, loginThunk, updateUser } from './features/auth/authSlice'
import { LOGGED_USER } from './defines/CookieName';
import { Paper } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Friends from './components/Friends/Friends';
import AuthRoute from './components/AuthRoute/AuthRoute';
import MySocket from './defines/Socket/MySocket';
import SocketEventName from './defines/Socket/SocketEventName';
import { setNotify } from './features/notify/NotifySlice';
import Helper from './defines/Helper';
import Message from './defines/Message';

export default function App() {
    const [cookies] = useCookies([LOGGED_USER]);
    const user = useSelector(loggedUser) || {};
    const dispatch = useDispatch();

    useEffect(() => {
        MySocket.onUpdateUser((data) => {
            dispatch(updateUser(data))
        })
        MySocket.onFriendAccepted((data) => {
            // notify
            MySocket.emitUpdateUserById(user._id);
            dispatch(setNotify({ message: Helper.format(Message.friendAccepted, data.user.username,), type: 'info', open: true }));
        })
        MySocket.onFriendRequested((data) => {
            // notify
            MySocket.emitUpdateUserById(user._id);
            dispatch(setNotify({ message: Helper.format(Message.friendRequested, data.user.username,), type: 'info', open: true }));
        })
        MySocket.onFriendUnFriend((data) => {
            MySocket.emitUpdateUserById(user._id);
        })
        MySocket.onFriendRequestCanceled((data) => {
            MySocket.emitUpdateUserById(user._id);
        })
        MySocket.onFriendRejected((data) => {
            MySocket.emitUpdateUserById(user._id);
        })
        return () => {
            MySocket.off(SocketEventName.updateUser)
            MySocket.off(SocketEventName.friendAccepted)
            MySocket.off(SocketEventName.friendRequested)
            MySocket.off(SocketEventName.friendUnfriend)
            MySocket.off(SocketEventName.friendRequestCanceled)
            MySocket.off(SocketEventName.friendRejected)
        }
    }, [dispatch, user._id])

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
            <Router>
                <Paper style={{
                    //minHeight: '100vh'
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                        </Grid>
                    </Grid>
                </Paper>
            </Router>
        </ThemeProvider >
    )
}
