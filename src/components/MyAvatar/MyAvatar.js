import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0
        }
    }
}))(Badge);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1)
        }
    }
}));

export default function MyAvatar({ name, picture, online, sizeInPixel }) {
    const classes = useStyles();
    const myStyle = true ? { width: `${sizeInPixel}px`, height: `${sizeInPixel}px` } : {};
    const avatar = <Avatar style={myStyle} alt={name} src={picture} />;
    return (
        <div className={classes.root}>
            {(online) ? (
                <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    variant="dot">
                    {avatar}
                </StyledBadge>
            ) : avatar
            }
        </div>
    );
}