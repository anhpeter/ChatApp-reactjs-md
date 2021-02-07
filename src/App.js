import React from 'react'
import Grid from '@material-ui/core/Grid'
import Header from './components/Header'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import Content from './components/Content'

export default function App() {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* HEADER */}
                    <Header></Header>

                    {/* CONTENT */}
                    <Content></Content>
                </Grid>
            </Grid>
        </div>
    )
}
