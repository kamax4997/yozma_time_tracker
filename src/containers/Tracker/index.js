import React, { useState, useEffect, useContext, useMemo } from 'react';
import { withRouter } from 'react-router-dom';

import moment from 'moment';
import queryString from 'query-string';

import { DatePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';

import CustomDatePickerInput from 'components/extensions/CustomDatePickerInput';
import Calendar from './Calendar';

import { DbMembersContext } from 'utils/firebase';
import { DbTrackersContext } from 'utils/firebase';
import { filterTrackEntries } from './functions';
import { populateTrackers } from 'utils/functions';

const weekFormat = 'GGGG-WW';

function Tracker(props) {
    const { location, history } = props;

    const dateUrlParam = queryString.parse(location.search).date;
    const [dateSelected, setDateSelected] = useState(moment(dateUrlParam, 'YYYYMMDD').toDate());

    useEffect(() => {
        const urlParams = {
            date: moment(dateSelected).format('YYYYMMDD')
        };
        history.push('/time?' + queryString.stringify(urlParams));
    }, [history, dateSelected]);

    const { members } = useContext(DbMembersContext);
    const { trackers } = useContext(DbTrackersContext);

    const weekSelected = moment(dateSelected).format(weekFormat);
    const trackEntriesFiltered = useMemo(() => filterTrackEntries(trackers, weekSelected, weekFormat), [
        trackers,
        weekSelected
    ]);
    const trackEntriesPopulated = useMemo(() => populateTrackers(trackEntriesFiltered, members), [
        trackEntriesFiltered,
        members
    ]);

    const theme = useTheme();

    return (
        <Box p={2}>
            <Grid container justify="center">
                <Grid item xs={12} md={10} lg={8} xl={6}>
                    <Paper style={{ display: 'inline-block', marginBottom: theme.spacing(2) }}>
                        <DatePicker
                            inputVariant="outlined"
                            showTodayButton
                            autoOk
                            format="dddd [·] MMM DD"
                            value={dateSelected}
                            TextFieldComponent={CustomDatePickerInput}
                            onChange={date => setDateSelected(date)}
                        />
                    </Paper>

                    <Calendar
                        dateSelected={dateSelected}
                        trackEntries={trackEntriesPopulated}
                        setDateSelected={setDateSelected}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default withRouter(Tracker);
