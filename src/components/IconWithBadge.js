import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 5,
        border: '1px solid white',
        padding: '0 4px',
    },
}))(Badge);

export default function IconWithBadge({ badgeContent, children, ...rest }) {
    return (
        <IconButton color="inherit" {...rest}>
            <StyledBadge badgeContent={badgeContent || ''} color="primary">
                {children}
            </StyledBadge>
        </IconButton>
    );
}
