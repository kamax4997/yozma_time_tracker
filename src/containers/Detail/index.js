import React, { useState, useContext, useMemo } from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';

import { DbMembersContext, DbTrackersContext } from 'utils/firebase';
import { getHoursFromSeconds, getMinutesFromSeconds } from 'utils/helpers/timeHelper';
import { useLocation } from 'react-router-dom';

// TODO: in future, archived members should go into a separate List and have an un-archive option as action
function Detail() {
    const theme = useTheme();
    const rows = [];
    const location = useLocation();
    const trackId = location.state ? location.state.id : null;

    const { members } = useContext(DbMembersContext);
    const { trackers } = useContext(DbTrackersContext);

    const trackDetail = trackers.find(tracker => tracker.id == trackId);
    const member = members.find(member => member.id == trackDetail.project_uid.id);

    return (
        <Paper style={{ padding: theme.spacing(2), width: '100%' }}>
            <Typography variant="h5" style={{ marginBottom: 20 }}>Track Item Detail</Typography>
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Created Time"
                        value={new Date(trackDetail.created_at.seconds * 1000)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Description"
                        value={trackDetail.description}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Duration"
                        value={getHoursFromSeconds(trackDetail.time) + "h " + getMinutesFromSeconds(trackDetail.time) + "m"}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Member Name"
                        value={member.name}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Detail;
