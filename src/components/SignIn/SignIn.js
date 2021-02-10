import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotify } from '../../features/notify/NotifySlice';
import { isLogged, login, signIn } from '../../features/auth/authSlice';
import * as Message from '../../defines/Message';
import { useCookies } from 'react-cookie';
import Helper from '../../defines/Helper'
import { API_ADDRESS } from '../../defines/Config';
import Axios from 'axios';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function SignIn() {
    const dispatch = useDispatch();
    const logged = useSelector(isLogged);
    const [cookies, setCookie] = useCookies(['loggedUser']);
    const [form, setForm] = useState({ username: '', password: '' });
    const onInputChange = (e, field) => {
        setForm({
            ...form,
            [field]: e.target.value

        })
    }

    const checkUsername = (username) => {
        return username.match(/[a-zA-Z0-9]{4,}/);
    }

    const checkPassword = (password) => {
        return password.trim().length >= 2;
    }

    const checkInfo = () => {
        let { username, password } = form;
        if (checkUsername(username)) {
            if (checkPassword(password)) {
                dispatch(login({ username, password }));
                //let user = { username, password };
                //dispatch(signIn({ user }))
                //setCookie('loggedUser', JSON.stringify(user));
                //history.push('/chat');
            } else notifyInvalid(Message.invalid('password'));

        } else notifyInvalid('username invalid');
    }
    const notifyInvalid = (message, type = 'error') => {
        dispatch(setNotify({ message: Helper.ucFirst(message), type, open: true }));
    }
    const history = useHistory();
    const classes = useStyles();

    return (
        (!logged) ? (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                </Typography>
                    <form className={classes.form} noValidate onSubmit={(e) => { e.preventDefault() }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={(e) => { onInputChange(e, 'username') }}
                            autoFocus />

                        <TextField
                            onChange={(e) => { onInputChange(e, 'password') }}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password" />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={checkInfo}
                        >
                            Sign In
                    </Button>
                    </form>
                </div>
            </Container>
        ) : (
                <Redirect to="/chat"></Redirect>
            )
    );
}
