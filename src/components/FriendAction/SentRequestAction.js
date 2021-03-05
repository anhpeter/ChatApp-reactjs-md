import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserApi from '../../defines/https/UserApi';
import MySocket from '../../defines/Socket/MySocket';
import mainStyles from '../../defines/styles/MainStyles'
import { authUser } from '../../features/auth/authSlice';
import { onCancelFriendRequest } from '../../features/friend/FriendSlice';

export default function SentRequestAction({ item }) {
    const dispatch = useDispatch();
    const classes = mainStyles();
    const user = useSelector(authUser);
    const onCancelClick = async () => {
        const data = await UserApi.cancelFriendRequest(user._id, item._id);
        if (data.status === 'succeeded') {
            MySocket.emitCancelFriendRequest(user, item._id);
            dispatch(onCancelFriendRequest({ user: item }));
        }
    }
    return (
        <React.Fragment>
            <Button onClick={onCancelClick} variant="contained" size="small" className={classes.buttonStyle}>Cancel request</Button>
        </React.Fragment>
    )
}
