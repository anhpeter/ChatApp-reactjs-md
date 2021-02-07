import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { Button, makeStyles } from '@material-ui/core'

import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import Slt from '../defines/Slt'

const useStyles = makeStyles({
    flexGrowStyle: {
        flexGrow: 1,
    }
})

export default function Header(props) {
    const classes = useStyles(props);
    return (
        <div>
            <AppBar position="static" color="primary" id={Slt.mainAppBar}>
                <Toolbar>
                    <IconButton aria-label="menu icon" color="inherit">
                        <MenuIcon></MenuIcon>
                    </IconButton>
                    <Typography variant="h6" className={classes.flexGrowStyle}>
                        Messenger
                    </Typography>
                    <Button startIcon={<PersonIcon></PersonIcon>} color="inherit">
                        <Typography > Sign in </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
