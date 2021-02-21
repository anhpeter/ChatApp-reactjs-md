import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import mainStyles from '../../defines/styles/MainStyles'
import Message from '../../defines/Message'
import UserApi from '../../defines/https/UserApi';
import { useSelector } from 'react-redux';
import { loggedUser } from '../../features/auth/authSlice';
import MySocket from '../../defines/Socket/MySocket';

const ITEM_HEIGHT = 48;

export default function SentRequestAction({ item }) {

    const user = useSelector(loggedUser);
    const classes = mainStyles();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    // click
    const onUnfriend = async () => {
        const data = await UserApi.unfriend(user._id, item._id);
        console.log('data', data);
        if (data.status === 'succeeded') {
            MySocket.emitUpdateUserById(user._id);
            MySocket.emitUnfriend(user, item._id);
        }
    }

    const onChat = () => {

    }

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem><Button onClick={onChat} variant="contained" size="small" fullWidth color="primary" className={classes.buttonStyle}>Chat</Button></MenuItem>
                <MenuItem><Button onClick={onUnfriend} variant="contained" size="small" fullWidth className={classes.buttonStyle}>Unfriend</Button></MenuItem>
            </Menu>
        </div>
    );
}
