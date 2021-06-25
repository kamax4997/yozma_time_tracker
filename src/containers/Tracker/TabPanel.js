import React from 'react';

import _ from 'lodash';

import List from '@material-ui/core/List';

import TrackEntry from './TrackEntry';
import TrackEntryEmptyState from './TrackEntryEmptyState';

function TabPanel(props) {
    const { trackEntries, onActionClick } = props;
    
    if (_.isEmpty(trackEntries)) {
        return <TrackEntryEmptyState />;
    }

    return (
        <List disablePadding>
            {_.orderBy(trackEntries, t => t.created_at.toDate(), 'asc').map((trackEntry, index) => {
                return <TrackEntry key={trackEntry.id} divider={index < trackEntries.length - 1} {...trackEntry} onActionClick={onActionClick} />;
            })}
        </List>
    );
}

export default TabPanel;
