import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserApi from '../../defines/https/UserApi';
import Message from '../../defines/Message';
import MySocket from '../../defines/Socket/MySocket';
import mainStyles from '../../defines/styles/MainStyles'
import { authUser, updateUser } from '../../features/auth/authSlice';
import { onAcceptFriendRequest, onRejectFriendRequest } from '../../features/friend/FriendSlice';

export default function SentRequestAction({ item }) {
    const dispatch = useDispatch();
    const classes = mainStyles();
    const user = useSelector(authUser);
    const onConfirmClick = async () => {
        const data = await UserApi.confirmFriendRequest(user._id, item._id);
        if (data.status === 'succeeded') {
            MySocket.emitAcceptFriend(user, item._id);
            dispatch(onAcceptFriendRequest({ user: item }));
        }
    }

    const onDeleteClick = async () => {
        const data = await UserApi.deleteFriendRequest(user._id, item._id);
        if (data.status === 'succeeded') {
            MySocket.emitDeleteFriendRequest(user, item._id);
            dispatch(onRejectFriendRequest({ user: item }));
        }
    }
    return (
        <React.Fragment>
            <Button onClick={onConfirmClick} color="primary" variant="contained" size="small" className={classes.buttonStyle}>Confirm</Button>
            <Button onClick={onDeleteClick} variant="contained" size="small" className={classes.buttonStyle}>Delete</Button>
        </React.Fragment>
    )
}
