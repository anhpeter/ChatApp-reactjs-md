import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

export default function MyAvatarGroup({ items, max = 2 }) {
    const avatars = items.slice(0, max).map((item, index) => {
        return <Avatar key={index} alt={item.name} src={item.src} />;
    })
    return (
        <AvatarGroup max={max} spacing="small">
            {avatars}
        </AvatarGroup>
    );
}
