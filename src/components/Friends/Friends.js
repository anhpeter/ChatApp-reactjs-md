import React, { useEffect} from 'react';
import './Friends.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid'
import AppTitle from '../AppTitle/AppTitle';
import { useHistory, useParams } from 'react-router-dom';
import FriendBox from '../FriendBox/FriendBox';
import OnlineUsers from '../OnlineUser/OnlineUsers';
import mainStyles from '../../defines/styles/MainStyles';
import { Box } from '@material-ui/core';


function a11yProps(index) {
    return { id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` };
}

const friendTabs = ['friends_all', 'friends_request', 'friends_sent_request', 'people_may_know'];

export default function Friends() {
    const classes = mainStyles();
    const [value,
        setValue] = React.useState(0);
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        let tab = params.friendsTab;
        let index = friendTabs.indexOf(tab);
        index = index < 0 ? 0 : index;
        setValue(index);
    }, [params.friendsTab])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        let tab = friendTabs[newValue];
        history.push(`/${tab}`);
    };

    return (
        <React.Fragment>
            <Box p={2} >
                <Grid container spacing={2}>
                    <Grid item xs={9} >
                        <AppTitle title="Friends"></AppTitle>
                        <Box mt={1}>
                            <AppBar position="static" color="default">
                                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary" className="my-tabs" scrollButtons="auto" variant="scrollable">
                                    <Tab label="All Friends" {...a11yProps(0)} />
                                    <Tab label="Friend Requests" {...a11yProps(1)} />
                                    <Tab label="Sent Requests" {...a11yProps(2)} />
                                    <Tab label="People you may know" {...a11yProps(3)} />
                                </Tabs>
                            </AppBar>
                            <FriendBox type={friendTabs[value]}></FriendBox>
                        </Box>
                    </Grid>
                    <Grid item xs={3} ><OnlineUsers /> </Grid>
                </Grid>
            </Box>
        </React.Fragment>

    );
}
