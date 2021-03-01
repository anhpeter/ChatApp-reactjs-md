import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserApi from '../../defines/https/UserApi';
import Message from '../../defines/Message';
import MySocket from '../../defines/Socket/MySocket';
import mainStyles from '../../defines/styles/MainStyles'
import { authUser, updateUser } from '../../features/auth/authSlice';

export default function SentRequestAction({ item }) {
    const classes = mainStyles();
    const user = useSelector(authUser);
    const onAddFriend = async () => {
        const data = await UserApi.sentFriendRequest(user._id, item._id);
        if (data.status === 'succeeded') {
            MySocket.emitUpdateUserById(user._id);
            MySocket.emitAddFriend(user, item._id);
        }
    }
    return (
        <React.Fragment>
            <Button onClick={onAddFriend} color="primary" variant="contained" size="small" className={classes.buttonStyle}>Add friend</Button>
        </React.Fragment>
    )
}
