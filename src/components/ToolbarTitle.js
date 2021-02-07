
import { Typography } from '@material-ui/core'
import React from 'react'

export default function ToolbarTitle(props) {
    return (
        <Typography
            variant="h6"
            style={{
                flexGrow: 1
            }}>
            {props.title}
        </Typography>
    )
}
