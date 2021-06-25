import React, { useState, useMemo } from 'react';

import _ from 'lodash';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import FullPageLoader from 'components/loaders/FullPageLoader';
import NavBar from './NavBar';
import LeftDrawer from './LeftDrawer';
import AuthRoutes from 'navigation/AuthRoutes';

import {
    useDbUser,
    DbUserContext,
    useDbMembers,
    DbMembersContext,
    useDbTrackers,
    DbTrackersContext
} from 'utils/firebase';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    routerBox: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    }
}));

function MainPage(props) {
    const classes = useStyles();

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const { userLoading, userError, user } = useDbUser();
    const { membersLoading, membersError, members } = useDbMembers();
    const { trackersLoading, trackersError, trackers } = useDbTrackers();

    const handleDrawerToggle = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };

    const activeMembers = useMemo(() => _.filter(members, p => !p.archived), [members]);
    const activeMembersExist = !_.isEmpty(activeMembers);

    if (userLoading || membersLoading || trackersLoading) {
        return <FullPageLoader />;
    }

    return (
        <DbUserContext.Provider value={{ userLoading, userError, user }}>
            <DbMembersContext.Provider value={{ membersLoading, membersError, members }}>
                <DbTrackersContext.Provider value={{ trackersLoading, trackersError, trackers }}>
                    <Box height="100%">
                        <LeftDrawer
                            mobileOpen={mobileDrawerOpen}
                            drawerWidth={drawerWidth}
                            onDrawerToggle={handleDrawerToggle}
                        />
                        <NavBar drawerWidth={drawerWidth} onDrawerToggle={handleDrawerToggle} />
                        <Box className={classes.routerBox}>
                            <AuthRoutes activeMembersExist={activeMembersExist} />
                        </Box>
                    </Box>
                </DbTrackersContext.Provider>
            </DbMembersContext.Provider>
        </DbUserContext.Provider>
    );
}

export default MainPage;
