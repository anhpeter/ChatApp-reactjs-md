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
    const onAddFriend = async () => {
        const data = await UserApi.sentFriendRequest(user._id, item._id);
        if (data.status === 'succeeded') {
            dispatch(updateUser());
        } else alert(Message.fail);
    }
    return (
        <React.Fragment>
            <Button onClick={onAddFriend} color="primary" variant="contained" size="small" className={classes.buttonStyle}>Add friend</Button>
        </React.Fragment>
    )
}
