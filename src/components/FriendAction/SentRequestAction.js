import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserApi from '../../defines/https/UserApi';
import Message from '../../defines/Message';
import mainStyles from '../../defines/styles/MainStyles'
import { loggedUser, updateUser } from '../../features/auth/authSlice';

export default function SentRequestAction({ item }) {
    const classes = mainStyles();
    const user = useSelector(loggedUser);
    const dispatch = useDispatch();
    const onCancelClick = async () => {
        const data = await UserApi.cancelFriendRequest(user._id, item._id);
        console.log('data', data);
        if (data.status === 'succeeded') {
            dispatch(updateUser());
        } else alert(Message.fail);
    }
    return (
        <React.Fragment>
            <Button onClick={onCancelClick} variant="contained" size="small" className={classes.buttonStyle}>Cancel request</Button>
        </React.Fragment>
    )
}
