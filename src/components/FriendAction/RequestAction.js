import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserApi from '../../defines/https/UserApi';
import Message from '../../defines/Message';
import MySocket from '../../defines/Socket/MySocket';
import mainStyles from '../../defines/styles/MainStyles'
import { loggedUser, updateUser } from '../../features/auth/authSlice';

export default function SentRequestAction({ item }) {
    const classes = mainStyles();
    const user = useSelector(loggedUser);
    const onConfirmClick = async () => {
        const data = await UserApi.confirmFriendRequest(user._id, item._id);
        console.log('data', data);
        if (data.status === 'succeeded') {
            MySocket.emitUpdateUserById(user._id);
            MySocket.emitAcceptFriend(user, item._id);
        }
    }

    const onDeleteClick = () => {
        alert(item.username);
    }
    return (
        <React.Fragment>
            <Button onClick={onConfirmClick} color="primary" variant="contained" size="small" className={classes.buttonStyle}>Confirm</Button>
            <Button onClick={onDeleteClick} variant="contained" size="small" className={classes.buttonStyle}>Delete</Button>
        </React.Fragment>
    )
}
