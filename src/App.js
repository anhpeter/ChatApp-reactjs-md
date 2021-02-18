import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import Header from './components/Header/Header'
import Chat from './features/chat/Chat'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Notify from './features/notify/Notify'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk } from './features/auth/authSlice'
import { LOGGED_USER } from './defines/CookieName';
import { Paper } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Friends from './components/Friends/Friends';
import AuthRoute from './components/AuthRoute/AuthRoute';

export default function App() {
    const [cookies] = useCookies([LOGGED_USER]);
    const dispatch = useDispatch();

    // USE SELECTOR
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
                    minHeight: '100vh'
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {/* HEADER */}
                            <Header></Header>
                            <Switch>
                                {/* CONTENT */}
                                <PrivateRoute path="/chat" exact>
                                    <Chat></Chat>
                                </PrivateRoute>
                                <PrivateRoute path="/friends" exact>
                                    <Friends></Friends>
                                </PrivateRoute>
                                <AuthRoute path="/login" exact ><SignIn></SignIn></AuthRoute>
                                <AuthRoute path="/sign-up" exact ><SignUp></SignUp></AuthRoute>
                                <Redirect to="/chat"></Redirect>
                            </Switch>
                            <Notify></Notify>
                        </Grid>
                    </Grid>
                </Paper>
            </Router>
        </ThemeProvider >
    )
}
