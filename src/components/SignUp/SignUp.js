import React, { useState, } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { setNotify } from '../../features/notify/NotifySlice';
import { isLogged, login, status } from '../../features/auth/authSlice';
import Helper from '../../defines/Helper'
import { Formik } from 'formik';
import UserApi from '../../defines/https/UserApi';
import * as yup from 'yup';
import UserValidates from '../../defines/validates/UserValidates';
import Message from '../../defines/Message';
import { Box } from '@material-ui/core';
import RouterLink from '../RouterLink/RouterLink';

let timeoutObj;
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
}));

export default function SignUp() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState({ value: '', unique: false });

    // SELECTOR
    const logged = useSelector(isLogged);
    const authStatus = useSelector(status);
    const classes = useStyles();

    if (authStatus === 'loading')
        return null;

    return (!logged
        ? (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Sign Up</Typography>
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                            passwordConfirmation: ''
                        }}
                        validationSchema={yup.object({
                            username: UserValidates.username(username, setUsername, timeoutObj),
                            password: UserValidates.password(),
                            passwordConfirmation: UserValidates.passwordConfirmation(),
                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                            const { username, password } = values;
                            let data = await UserApi.createAccount(username, password);
                            if (data.status === 'succeeded') {
                                const user = data.payload;
                                dispatch(setNotify({ message: Helper.format(Message.welcomeNewAccount, user.username) }));
                                dispatch(login(user));
                            } else {
                                setSubmitting(false);
                            }
                        }}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            isValid,
                            dirty
                            /* and other goodies */
                        }) => {
                            const showErrors = {};
                            for (let key in errors) {
                                showErrors[key] = (errors[key] != null) && touched[key];
                            }
                            const props = (field, label) => {
                                label = label || Helper.ucFirst(field);
                                return {
                                    fullWidth: true,
                                    margin: 'normal',
                                    placeholder: label,
                                    variant: 'outlined',
                                    name: field,
                                    onChange: handleChange,
                                    onBlur: handleBlur,
                                    value: values[label],
                                    label: label,
                                    error: (showErrors[field]),
                                    helperText: (showErrors[field])
                                        ? errors[field]
                                        : null
                                }
                            }
                            return (
                                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                                    <TextField type="text" {...props('username')} />
                                    <TextField type="password" {...props('password')} />
                                    <TextField type="password" {...props('passwordConfirmation', 'Password confirmation')} />
                                    <Box >
                                        <Button
                                            disabled={isSubmitting || !isValid || !dirty}
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                        > Sign Up </Button>
                                    </Box>
                                    <RouterLink to="/signin">
                                        <Typography color="primary" style={{ cursor: 'pointer' }}>
                                            Have an account?
                                        </Typography>
                                    </RouterLink>
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </Container >
        )
        : (null));
}
