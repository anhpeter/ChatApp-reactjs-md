import { Hidden, IconButton } from '@material-ui/core'
import React from 'react'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import EditIcon from '@material-ui/icons/Edit';

export default function ChatAction() {
    return (
        <div>
            <IconButton color="default">
                <MoreHorizIcon></MoreHorizIcon>
            </IconButton>
        </div>
    )
}
