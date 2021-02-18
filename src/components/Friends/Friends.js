import React from 'react';
import PropTypes from 'prop-types';
import './Friends.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import AppTitle from '../AppTitle/AppTitle';
import MyTabPanel from '../MyTabPanel/MyTabPanel';


function a11yProps(index) {
    return { id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` };
}

export default function Friends() {
    const [value,
        setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={false} md={2}></Grid>
                <Grid item xs={12} md={8}>
                    <AppTitle title="Friends"></AppTitle>
                    <AppBar position="static" color="default">
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary" className="my-tabs">
                            <Tab label="All Friends" {...a11yProps(0)} />
                            <Tab label="Friend Requests" {...a11yProps(1)} />
                            <Tab label="Sent Requests" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <MyTabPanel value={value} index={0}>All Friends</MyTabPanel>
                    <MyTabPanel value={value} index={1}>Friend Requests</MyTabPanel>
                    <MyTabPanel value={value} index={2}>Sent Requests</MyTabPanel>
                </Grid>
                <Grid item xs={false} md={2}></Grid>
            </Grid>
        </div>

    );
}
