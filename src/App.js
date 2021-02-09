import React from 'react';
import Grid from '@material-ui/core/Grid'
import Header from './components/Header'
import Chat from './features/chat/Chat'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import SignIn from './components/SignIn'
import Notify from './features/notify/Notify'
import PrivateRoute from './components/PrivateRoute'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { signIn } from './features/auth/authSlice'
import { LOGGED_USER } from './defines/CookieName';


export default function App() {
    const [cookies] = useCookies([LOGGED_USER]);
    const dispatch = useDispatch();

    // SIGN IN WITH COOKIE
    if (cookies[LOGGED_USER]) dispatch(signIn({ user: cookies[LOGGED_USER] }))

    return (
        <Router>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* HEADER */}
                    <Header></Header>

                    {/* CONTENT */}
                    <Switch>
                        <PrivateRoute path="/chat" exact >
                            <Chat></Chat>
                        </PrivateRoute>
                        <Route path="/login" exact component={SignIn} />
                        <Redirect to="/chat"></Redirect>
                    </Switch>
                    <Notify></Notify>
                </Grid>
            </Grid>
        </Router>
    )
}
