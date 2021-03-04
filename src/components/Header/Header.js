import React from 'react'
import MyAvatar from '../MyAvatar/MyAvatar';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Box, Button, makeStyles } from '@material-ui/core'

import PersonIcon from '@material-ui/icons/Person';
import Slt from '../../defines/Slt'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isLogged, authUser, status } from '../../features/auth/authSlice'
import { signOut } from '../../features/auth/authSlice';
import { useCookies } from 'react-cookie'
import DayNightSwitch from '../DayNightSwitch/DayNightSwitch'
import Notifications from '../Notifications/Notifications';
import RunAction from '../RunAction/RunAction';
import { LOGGED_USER } from '../../defines/CookieName';

export default function Header(props) {
    const [cookies, setCookie, removeCookie] = useCookies(LOGGED_USER);
    const user = useSelector(authUser);
    const dispatch = useDispatch();
    const logged = useSelector(isLogged);
    const authStatus = useSelector(status);
    const location = useLocation();
    const pathName = location.pathname;
    const history = useHistory();

    const onSignout = () => {
        removeCookie(LOGGED_USER);
        dispatch(signOut());
        history.push('/');
    }

    const toolsHtml = (
        <Box display="flex" alignItems="center" justifyContent="center">
            <Box mr={4}>
                {logged
                    ? <Notifications></Notifications>
                    : null
                }
            </Box>
            {/* 
            <RunAction></RunAction>
             */}
            <DayNightSwitch></DayNightSwitch>
            {(logged)
                ? (
                    <MyAvatar name={user.name} single={user.single} picture={user.picture}></MyAvatar>
                )
                : null}
            <Button
                disabled={pathName === '/login'}
                startIcon={(!logged)
                    ? <PersonIcon></PersonIcon>
                    : null}
                color="inherit"
                onClick={() => {
                    onSignout();
                }}>
                <Typography >{(logged)
                    ? 'Sign out'
                    : 'Sign in'}</Typography>
            </Button>
        </Box>
    )

    return (
        <div>
            <AppBar position="static" color="primary" id={Slt.mainAppBar}>
                <Toolbar
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    <Typography variant="h6">
                        <Link to="/chat" color="inherit" style={{ color: 'white', textDecoration: 'none' }}>
                            Messenger
                        </Link>
                    </Typography>
                    {(authStatus !== 'loading') ? toolsHtml : null}
                </Toolbar>
            </AppBar>
        </div>
    )
}
