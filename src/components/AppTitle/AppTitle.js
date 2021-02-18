import { Box, Typography } from '@material-ui/core'
import React from 'react'

export default function AppTitle(props) {
    return (
        <Box my={2}>
            <Typography variant="h5">{props.title}</Typography>
        </Box>
    )
}
