import { Avatar, Box, IconButton, ListItemText, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import UserApi from '../../defines/https/UserApi'
import Helper from '../../defines/Helper'
import FolderIcon from '@material-ui/icons/Folder';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import './ReceiverInput.css';
import { useSelector } from 'react-redux';
import { authUserId } from '../../features/auth/authSlice';
import SuggestionUsers from '../SuggestionUsers/SuggestionUsers';

let timeout;

const SelectedUsers = ({ items, onCloseClick }) => {
    return items.map((item) => {
        return (
            <Alert
                key={item._id}
                className="selected-receiver"
                severity="info"
                icon={false}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => { onCloseClick(item) }} >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            > {item.username}</Alert>
        )
    })
}

export default function ReceiverInput() {
    const [mounted, setMounted] = useState(true);
    const [suggestionUsers, setSuggestionUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [inputVal, setInputVal] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const inputRef = useRef(null);
    const loggedUserId = useSelector(authUserId)

    // fetch suggestion users
    useEffect(() => {
        setMounted(true);
        const fetchUsers = async () => {
            const data = await UserApi.findReceivers(receiverName, Helper.getArrayOfFieldValue(selectedUsers, '_id').concat(loggedUserId));
            const { status, payload } = data;
            if (status === 'succeeded') {
                if (mounted) {
                    setSuggestionUsers(payload);
                }
            }
        }
        if (receiverName.trim() !== '') fetchUsers();
        return () => {
            setMounted(false);
        }
    }, [receiverName, selectedUsers, loggedUserId])

    // suggestion users
    const onSuggestionUserClick = (item) => {
        setSelectedUsers(selectedUsers.concat(item));
        setInputVal('');
        setReceiverName('');
        setSuggestionUsers([])
        const input = inputRef.current.querySelector('input');
        input.focus();
    }

    // selected users
    const onRemoveSelectedUser = (item) => {
        setSelectedUsers(selectedUsers.filter((user) => {
            return user._id !== item._id;
        }))
    }

    const solveSelectedUsers = (e, oldVal, newVal) => {
        if (e.which === 8 && oldVal.trim() === '' && newVal.trim() === '') {
            // pop
            if (selectedUsers.length > 0) {
                setSelectedUsers(selectedUsers.slice(0, -1));
            }

        }
    }

    // input events
    const onInputChange = (e) => {
        const value = e.target.value;
        setInputVal(value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setReceiverName(value);
        }, 500);
    }

    const onInputKeyup = (e) => {
        const value = e.target.value;
        solveSelectedUsers(e, inputVal, value);
    }

    const onInputBlur = (e) => {
        const value = e.target.value;
        solveSelectedUsers(e, inputVal, value);
    }

    // render
    return (
        <Box className="receiver-wrapper">
            <Typography className="receiver-label" >To: </Typography>
            <Box className="receiver-container" display="inline-block" >
                <SelectedUsers items={selectedUsers} onCloseClick={onRemoveSelectedUser}></SelectedUsers>
                <Box className="receiver-input-container">
                    {/* input */}
                    <TextField placeholder="Receiver" ref={inputRef} className="receiver-input" autoFocus={true} onKeyUp={onInputKeyup} onChange={onInputChange} onBlur={onInputBlur} value={inputVal} />
                    {/* LIST */}
                    {(suggestionUsers.length > 0) ? (
                        <SuggestionUsers items={suggestionUsers} onItemClick={onSuggestionUserClick}></SuggestionUsers>
                    ) : null}
                    {/* END LIST */}
                </Box>
            </Box>
        </Box>
    )
}