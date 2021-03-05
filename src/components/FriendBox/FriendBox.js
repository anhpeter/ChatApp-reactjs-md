import {
    Card,
    CardHeader,
    Grid,
    IconButton,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UserApi from '../../defines/https/UserApi';
import { isLogged, authUser } from '../../features/auth/authSlice';
import MyAvatar from '../MyAvatar/MyAvatar'
import FriendList from '../FriendList/FriendList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendsByIds, selectAllStranger, fetchStrangersByUsername, friendStatus, selectAllFriend, selectAllRequest, selectAllSentRequest } from '../../features/friend/FriendSlice';

const AllFriendList = () => {
    const type = 'friend';
    const items = useSelector(selectAllFriend);

    const user = useSelector(authUser);
    const status = useSelector((state) => friendStatus(state, type));
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchFriendsByIds({ type, ids: user.friend[type] }));
        }
    }, [status, user.friend[type]])

    return (
        <FriendList items={items} type={type} isLoading={status === 'loading'}></FriendList>
    );
}

const SentRequestList = () => {
    const type = 'sent_request';
    const items = useSelector(selectAllSentRequest);

    const user = useSelector(authUser);
    const status = useSelector((state) => friendStatus(state, type));
    const dispatch = useDispatch();

    // FETCH
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchFriendsByIds({ type, ids: user.friend[type] }));
        }
    }, [status, user.friend[type]])

    return (
        <FriendList items={items} type={type} isLoading={status === 'loading'}></FriendList>
    )
}

const RequestList = () => {
    const type = 'request';
    const items = useSelector(selectAllRequest);

    const user = useSelector(authUser);
    const status = useSelector((state) => friendStatus(state, type));
    const dispatch = useDispatch();

    // FETCH
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchFriendsByIds({ type, ids: user.friend[type] }));
        }
    }, [status, user.friend[type]])

    return (
        <FriendList items={items} type={type} isLoading={status === 'loading'}></FriendList>
    )
}

const PeopleMayKnowList = ({ username }) => {
    const type = 'stranger';
    const items = useSelector(selectAllStranger);

    const user = useSelector(authUser);
    const status = useSelector((state) => friendStatus(state, type));
    const dispatch = useDispatch();

    // FETCH
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchStrangersByUsername({ type, username }));
        }
    }, [status, user.username])

    return (
        <FriendList items={items} type={type} isLoading={status === 'loading'}></FriendList>
    )
}

export default function FriendBox({ type }) {
    let itemsHtml = null;
    const logged = useSelector(isLogged);
    const user = useSelector(authUser);
    if (logged) {
        switch (type) {
            case 'friends_request':
                itemsHtml = <RequestList username={user.username}></RequestList>
                break;
            case 'friends_sent_request':
                itemsHtml = <SentRequestList username={user.username}></SentRequestList>
                break;
            case 'people_may_know':
                itemsHtml = <PeopleMayKnowList username={user.username}></PeopleMayKnowList>
                break;
            default:
                itemsHtml = <AllFriendList username={user.username}></AllFriendList>
                break;
        }
    }

    return (
        <Grid style={{
            paddingTop: '8px',
            maxHeight: '500px',
            overflowY: 'auto',
        }} className="custom-scrollbar" container spacing={2} >{itemsHtml}</Grid>
    )
}
