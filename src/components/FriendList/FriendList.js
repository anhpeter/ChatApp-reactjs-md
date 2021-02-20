import {
    Card,
    CardActions,
    CardHeader,
    Grid,
    Typography
} from '@material-ui/core'
import React from 'react'
import { loggedUser } from '../../features/auth/authSlice';
import MyAvatar from '../MyAvatar/MyAvatar'
import SentRequestAction from '../FriendAction/SentRequestAction';
import RequestAction from '../FriendAction/RequestAction';
import StrangerAction from '../FriendAction/StrangerAction';
import FriendAction from '../FriendAction/FriendAction';
import { useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
const getType = (user, friendId) => {
    let { all, request, sent_request } = user.friend;

    let type;
    if (all.indexOf(friendId) > -1) {
        type = 'friend';
    } else if (request.indexOf(friendId) > -1) {
        type = 'request';
    } else if (sent_request.indexOf(friendId) > -1) {
        type = 'sent_request';
    } else type = 'stranger';

    return type
}

export default function FriendList({ items, type, isLoading }) {
    const user = useSelector(loggedUser);
    const itemsHtml = items.map((item, index) => {
        let localType = type;
        let action;
        console.log('before', type);
        localType = type || getType(user, item._id);
        console.log('localType', localType);
        if (localType === 'friend') {
            action = <FriendAction user={item}></FriendAction>
        } else if (localType === 'sent_request') {
            action = <SentRequestAction user={item}></SentRequestAction>
        } else if (localType === 'request') {
            action = <RequestAction user={item}></RequestAction>
        } else {
            action = <StrangerAction user={item}></StrangerAction>
        }
        const actions = (
            <CardActions style={{ justifyContent: 'flex-end' }}> {action} </CardActions>
        )
        return (
            <Grid key={index} item xs={12} md={6} >
                <Card >
                    <CardHeader
                        avatar={< MyAvatar name={
                            item.username
                        }
                            picture={
                                item.picture
                            } > </MyAvatar>}
                        action={actions}
                        title={item.username}
                        subheader={null} />
                </Card>
            </Grid>
        )
    })

    const message = (
        <React.Fragment>
            <Grid item xs={12}>
                {isLoading
                    ? <Loading></Loading>
                    : <Typography align="center" className="text-muted">Your list is empty</Typography>
                }
            </Grid>
        </React.Fragment>
    )
    return (
        <React.Fragment>{itemsHtml.length > 0 ? itemsHtml : message}</React.Fragment>
    );
}