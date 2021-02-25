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
import { isLogged, loginThunk, status, authError } from '../../features/auth/authSlice';
import { useCookies } from 'react-cookie';
import Helper from '../../defines/Helper'
import { LOGGED_USER } from '../../defines/CookieName';
import Message from '../../defines/Message';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Box } from '@material-ui/core';
import FormErrors from '../../defines/configs/FormErrors';
import RouterLink from '../RouterLink/RouterLink';

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
    const [isSubmitClicked, setSubmitClicked] = useState(false);

    // SELECTOR
    const logged = useSelector(isLogged);
    const [cookies, setCookie] = useCookies([LOGGED_USER]);

    const authStatus = useSelector(status);
    const authErr = useSelector(authError);

    const classes = useStyles();
    if (isSubmitClicked) {
        if (authStatus === 'succeeded' && authErr)
            dispatch(setNotify({ message: 'Login unsuccessfully', type: 'error', open: true }))
    } else {
        if (authStatus === 'loading') return null;
    }

    const mainHtml = (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>

                {/* FORMIK */}
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        passwordConfirmation: ''
                    }}
                    validationSchema={yup.object({
                        username: yup.string().required(Helper.format(FormErrors.required, 'Username')),
                        password: yup.string().required(Helper.format(FormErrors.required, 'Password')),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        const { username, password } = values;
                        let user = {
                            username,
                            password
                        };
                        setSubmitClicked(true);
                        dispatch(loginThunk(user));
                        setCookie(LOGGED_USER, user);
                        //alert(JSON.stringify(values));
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
                        dirty,
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
                                <TextField autoFocus={true} type="text" {...props('username')} />
                                <TextField type="password" {...props('password')} />
                                <RouterLink to="/sign-up">
                                    <Typography color="primary" >
                                        Create an account
                                        </Typography>
                                </RouterLink>
                                <Box mt={2}>
                                    <Button
                                        disabled={isSubmitting || !isValid || !dirty}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                    > Sign In
                                    </Button>
                                </Box>
                            </form>
                        )
                    }}
                </Formik>
                {/* END FORMIK */}

            </div>
        </Container>
    )

    return (!logged ? mainHtml : (null));
}
