import React from 'react';

import _ from 'lodash';
import moment from 'moment';
import queryString from 'query-string';

import WorkIcon from '@material-ui/icons/Work';
import TimerIcon from '@material-ui/icons/Timer';
import PersonIcon from '@material-ui/icons/Person';

const locations = [
    {
        to: () => '/',
        isSelected: pathname => pathname === '/',
        title: 'Track Lists',
        icon: <WorkIcon />
    },
    {
        to: location => generateToTime(location),
        isSelected: pathname => pathname === '/time',
        title: 'Tracker',
        icon: <TimerIcon />
    },
    {
        to: () => '/account',
        isSelected: pathname => pathname === '/account',
        title: 'Account',
        icon: <PersonIcon />
    }
];

function generateToTime(location) {
    if (location.pathname === '/time') {
        // repeated clicks won't change URL
        return {
            pathname: location.pathname,
            search: location.search
        };
    } else {
        return {
            pathname: '/time',
            search: queryString.stringify({
                date: moment().format('YYYYMMDD')
            })
        };
    }
}

function getLocationTitle(pathname) {
    const location = _.find(locations, l => l.isSelected(pathname));
    if (!_.isNil(location)) {
        return location.title;
    } else {
        return 'Not Found';
    }
}

export default locations;

export { generateToTime };
export { getLocationTitle };
