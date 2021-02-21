import {
    Card,
    CardHeader,
    Grid,
    IconButton,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UserApi from '../../defines/https/UserApi';
import { isLogged, loggedUser } from '../../features/auth/authSlice';
import MyAvatar from '../MyAvatar/MyAvatar'
import FriendList from '../FriendList/FriendList';
import { useSelector } from 'react-redux';

const AllFriend = ({ username }) => {
    const [items,
        setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await UserApi.findAllFriendsByUsername(username);
                if (data.status === 'succeeded')
                    setItems(data.payload);
                setLoading(false);
            }
            catch (e) { }
        }
        fetchItems();
    }, [username])

    return (
        <FriendList items={items} type="friend" isLoading={isLoading}></FriendList>
    );
}

const SentRequestList = () => {
    const [items,
        setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const user = useSelector(loggedUser);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await UserApi.findUsersByIds(user.friend.sent_request);
                if (data.status === 'succeeded')
                    setItems(data.payload);
                setLoading(false);
            }
            catch (e) { }
        }
        if (user.friend.sent_request.length > 0) {
            fetchItems();
        } else setLoading(false);
    }, [user.friend.sent_request]);
    return (
        <FriendList items={items} type='sent_request' isLoading={isLoading}></FriendList>
    )
}

const RequestList = () => {
    const [items,
        setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const user = useSelector(loggedUser);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await UserApi.findUsersByIds(user.friend.request);
                if (data.status === 'succeeded')
                    setItems(data.payload);
            }
            catch (e) { }
        }
        if (user.friend.request.length > 0) {
            fetchItems();
        } else setLoading(false);
        setLoading(false);
    }, [user.friend.request]);
    return (
        <FriendList items={items} type='request' isLoading={isLoading}></FriendList>
    )
}

const PeopleMayKnowList = ({ username }) => {
    const [items,
        setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await UserApi.findStrangerByUsername(username);
                if (data.status === 'succeeded')
                    setItems(data.payload);
                setLoading(false);
            }
            catch (e) { }
        }
        fetchItems();
    }, [username]);
    return (
        <FriendList items={items} isLoading={isLoading}></FriendList>
    )
}

export default function FriendBox({ type }) {
    let itemsHtml = null;
    const logged = useSelector(isLogged);
    const user = useSelector(loggedUser);
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
                itemsHtml = <AllFriend username={user.username}></AllFriend>
                break;
        }
    }


    return (
        <Grid style={{
            paddingTop: '8px'
        }} container spacing={2}>{itemsHtml}</Grid>
    )
}
