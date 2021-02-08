import React from 'react'
import Grid from '@material-ui/core/Grid'
import Header from './components/Header'
import Chat from './features/chat/Chat'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import SignIn from './components/SignIn'
import Notify from './features/notify/Notify'

export default function App() {
    return (
        <Router>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* HEADER */}
                    <Header></Header>

                    {/* CONTENT */}
                    <Switch>
                        <Route path="/chat" exact component={Chat} />
                        <Route path="/" exact component={SignIn} />
                    </Switch>
                    <Notify></Notify>
                </Grid>
            </Grid>
        </Router>
    )
}
