import { Typography } from '@material-ui/core'
import React from 'react'

export default function ChatNotification({children }) {
    return (
        <Typography align="center" className="text-muted">{children}</Typography>
    )
}
