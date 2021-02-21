import { Button, IconButton } from '@material-ui/core'
import React from 'react'
import mainStyles from '../../defines/styles/MainStyles'

import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function SentRequestAction({ item }) {
    return (
        <React.Fragment>
            < IconButton aria-label="setting" > <MoreVertIcon /> </IconButton>
        </React.Fragment>
    )
}
