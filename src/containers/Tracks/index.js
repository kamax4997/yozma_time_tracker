import React, { useState, useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';

import { DataGrid } from '@material-ui/data-grid';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { DbMembersContext, DbTrackersContext } from 'utils/firebase';
import { getHoursFromSeconds, getMinutesFromSeconds } from 'utils/helpers/timeHelper';

// TODO: in future, archived members should go into a separate List and have an un-archive option as action
function Tracks() {
    const theme = useTheme();
    const rows = [];

    let history = useHistory();
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'time', headerName: 'Duration', width: 100 },
        { field: 'member_name', headerName: 'Member', sortable: false, width: 160 },
        { field: 'action', headerName: 'Action', width: 160, 
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = () => {
                    history.push({
                        pathname: '/detail',
                        state: {
                            id: params.id
                        }
                    });
                };
    
                return <Button onClick={onClick}>Detail</Button>;
            }
        }
    ];

    const { members } = useContext(DbMembersContext);
    const { trackers } = useContext(DbTrackersContext);

    trackers.map(tracker => {
        const member = members.find(member => member.id == tracker.project_uid.id);
        rows.push({
            id: tracker.id,
            date: tracker.date,
            description: tracker.description,
            time: getHoursFromSeconds(tracker.time) + "h " + getMinutesFromSeconds(tracker.time) + "m",
            member_name: member.name
        });
    })

    return (
        <Box p={2}>
            <Paper style={{ marginBottom: theme.spacing(2), height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
            </Paper>
        </Box>
    );
}

export default Tracks;
