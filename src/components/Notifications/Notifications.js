import React from 'react'

import IconWithBadge from '../IconWithBadge';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router-dom';

export default function Notifications() {
    const history = useHistory();

    return (
        <React.Fragment>
            <IconWithBadge badgeContent="10">
                <MailIcon></MailIcon>
            </IconWithBadge>
            <IconWithBadge badgeContent="10" onClick={() => {
                history.push('/friends');
            }}>
                <PeopleAltIcon></PeopleAltIcon>
            </IconWithBadge>
        </React.Fragment>
    )
}
