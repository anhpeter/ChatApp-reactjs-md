import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import { Box, TextField } from '@material-ui/core'

export default function SearchBar(props) {
    return (
        <Box px={3}>
            <FormControl >
                <TextField id="standard-basic" label="Search" />
            </FormControl>
        </Box>
    )
}
