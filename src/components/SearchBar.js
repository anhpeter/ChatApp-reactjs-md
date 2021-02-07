import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import { Input, InputAdornment } from '@material-ui/core'
import mainStyles from '../defines/styles/MainStyles'
import SearchIcon from '@material-ui/icons/Search';

export default function SearchBar(props) {
    const mainStyleClasses = mainStyles(props);

    const handleChange = (value) => {
    }

    return (
        <div>
            <FormControl fullWidth={true}>
                <Input
                    placeholder="Search messenger"
                    className={mainStyleClasses.RoundLightGrayInputStyle}
                    fullWidth={true}
                    disableUnderline={true}
                    onChange={() => { handleChange('weight') }}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon></SearchIcon>
                        </InputAdornment>
                    }
                />
            </FormControl>

        </div>
    )
}
