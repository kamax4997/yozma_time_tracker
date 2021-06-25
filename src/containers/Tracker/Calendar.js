import React, { useState } from 'react';

import moment from 'moment';
import _ from 'lodash';

import SwipeableViews from 'resources/temp_packages/SwipeableViews';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import TabLabel from './TabLabel';
import TabPanel from './TabPanel';
import NewTrackEntry from './NewTrackEntry';
import TrackEntryDialog from './TrackEntryDialog';

const useStyles = makeStyles(theme => ({
    muiTabsIndicator: props => ({
        backgroundColor: theme.light() ? theme.palette.primary.main : theme.palette.common.white,
        borderBottomLeftRadius: props.tabIndex === 0 ? theme.shape.borderRadius : 'initial',
        borderBottomRightRadius: props.tabIndex === 6 ? theme.shape.borderRadius : 'initial'
    }),
    muiTabRoot: {
        flexGrow: 1,
        minWidth: 'auto'
    },
    muiTabSelected: {
        color: theme.light() ? theme.palette.primary.main : theme.palette.common.white
    },
    paper: {
        marginTop: theme.spacing(2)
    }
}));

// TODO: define Sunday/Monday start day in user settings
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Calendar(props) {
    const { trackEntries, dateSelected, setDateSelected } = props;
    
    const [trackEntryDialogOpen, setTrackEntryDialogOpen] = useState(false);
    const [trackEntrySelectedId, setTrackEntrySelectedId] = useState(null);

    const tabIndex = moment(dateSelected).isoWeekday() - 1;

    const classes = useStyles({ tabIndex });
    
    const handleTabChange = (event, newIndex) => {
        const newDateSelected = moment(dateSelected).add(newIndex - tabIndex, 'days');
        setDateSelected(newDateSelected);
    };
    
    const handleCreateTrackEntry = () => {
        setTrackEntryDialogOpen(true);
        setTrackEntrySelectedId(null);
    };

    const handleEditTrackEntry = id => {
        setTrackEntryDialogOpen(true);
        setTrackEntrySelectedId(id);
    };
    
    const trackEntrySelected = _.find(trackEntries, t => t.id === trackEntrySelectedId);
    
    return (
        <>
            <Paper>
                <Tabs classes={{ indicator: classes.muiTabsIndicator }} value={tabIndex} onChange={handleTabChange}>
                    {weekdays.map(weekday => (
                        <Tab
                            key={weekday}
                            classes={{ root: classes.muiTabRoot, selected: classes.muiTabSelected }}
                            label={<TabLabel label={weekday} />}
                        />
                    ))}
                </Tabs>
            </Paper>
            <Paper className={classes.paper}>
                <SwipeableViews
                    animateHeight
                    index={tabIndex}
                    onChangeIndex={newIndex => handleTabChange(null, newIndex)}
                >
                    {weekdays.map((weekday, index) => {
                        const date = parseInt(
                            moment(dateSelected)
                                .add(index - tabIndex, 'days')
                                .format('YYYYMMDD')
                        );
                        return (
                            <TabPanel
                                key={weekday}
                                value={tabIndex}
                                index={index}
                                trackEntries={trackEntries.filter(t => t.date === date)}
                                onActionClick={handleEditTrackEntry}
                            />
                        );
                    })}
                </SwipeableViews>
            </Paper>

            <NewTrackEntry onActionClick={handleCreateTrackEntry} />
            
            <TrackEntryDialog
                open={trackEntryDialogOpen}
                trackEntry={trackEntrySelected}
                dateSelected={dateSelected}
                onClose={() => setTrackEntryDialogOpen(false)}
            />
        </>
    );
}

export default Calendar;
