import { IconButton } from '@material-ui/core'
import React from 'react'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default function ChatAction() {
    return (
        <div>
            <IconButton color="default">
                <MoreHorizIcon></MoreHorizIcon>
            </IconButton>
        </div>
    )
}
