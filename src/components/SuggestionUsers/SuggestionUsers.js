import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import React from 'react'
import './SuggestionUsers.css'

export default function SuggestionUsers({ items = [], onItemClick }) {

    function generateSuggestionUsers(items) {
        return items.map((item) => {
            return (
                <ListItem button key={item._id} onClick={() => { onItemClick(item) }}>
                    <ListItemAvatar>
                        <Avatar src={item.picture}> </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.username}
                        secondary={false ? 'Secondary text' : null}
                    />
                </ListItem>
            )
        })
    }
    return (
        <List className="suggestion-receiver-list" dense={false} >
            {generateSuggestionUsers(items)}
        </List>
    )
}
