import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { type, message, open, setNotify, timeout } from './NotifySlice';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2)
        }
    }
}));

export default function Notify() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isOpen = useSelector(open);
    const msg = useSelector(message);
    const msgType = useSelector(type);
    const duration = useSelector(timeout);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setNotify({ open: false }));
    };

    return (
        <div className={classes.root}>
            <Snackbar open={isOpen} autoHideDuration={duration} onClose={handleClose}

                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'top',
                }}
                message={msg}
            >
                {
                    (msgType !== '') ? (

                        <Alert onClose={handleClose} severity={msgType}>
                            {msg}
                        </Alert>
                    ) : ''
                }
            </Snackbar>
        </div>
    );
}
