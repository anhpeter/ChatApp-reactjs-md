import React from 'react'

import IconWithBadge from '../IconWithBadge';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MessageIcon from '@material-ui/icons/Message';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router-dom';
import { IconButton, Tooltip } from '@material-ui/core';
import RouterLink from '../RouterLink/RouterLink';

export default function Notifications() {
    const history = useHistory();

    return (
        <React.Fragment>
            {/* 
            <IconWithBadge badgeContent="10">
                <MailIcon></MailIcon>
            </IconWithBadge>
             */}
            {/* 
            <IconWithBadge badgeContent="10" onClick={() => {
                history.push('/friends');
            }}>
            </IconWithBadge>
              */}
            <RouterLink to="/chat/new">
                <Tooltip title="Chat">
                    <IconButton color="inherit">
                        <MessageIcon></MessageIcon>
                    </IconButton>
                </Tooltip>
            </RouterLink>
            <RouterLink to="/friends">
                <Tooltip title="Friends">
                    <IconButton color="inherit">
                        <PeopleAltIcon></PeopleAltIcon>
                    </IconButton>
                </Tooltip>
            </RouterLink>
        </React.Fragment>
    )
}
