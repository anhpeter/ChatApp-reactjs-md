import React from 'react'

import IconWithBadge from '../IconWithBadge';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MessageIcon from '@material-ui/icons/Message';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router-dom';
import { Hidden, IconButton, Tooltip } from '@material-ui/core';
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
            <Hidden xsDown>
                <RouterLink to="/chat/new">
                    <Tooltip title="Chat">
                        <IconButton color="inherit">
                            <MessageIcon></MessageIcon>
                        </IconButton>
                    </Tooltip>
                </RouterLink>
            </Hidden>
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
