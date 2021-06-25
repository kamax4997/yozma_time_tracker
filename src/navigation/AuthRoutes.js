import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import Tracks from 'containers/Tracks';
import Tracker from 'containers/Tracker';
import Account from 'containers/Account';
import Detail from 'containers/Detail';
import NotFound from 'components/NotFound';

import { generateToTime } from './locations';

function AuthRoutes(props) {
    const { activeMembersExist, location } = props;

    return (
        <Switch>
            <Route exact path="/" component={Tracks} />
            <Route exact path="/detail" component={Detail} />
            <Route exact path="/time" component={Tracker} />
            <Route exact path="/account" component={Account} />
            <Redirect from="/login" to={activeMembersExist ? generateToTime(location) : '/'} />
            <Redirect from="/signup" to={activeMembersExist ? generateToTime(location) : '/'} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default withRouter(AuthRoutes);
