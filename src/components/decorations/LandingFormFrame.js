import React from 'react';

import { blueGrey, deepOrange } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

// import YozmaTechTimeTrackerLogo from 'resources/images/YozmaTech-timetracker-logo-512.png';
// import YozmaTechTimeTrackerLogoWhite from 'resources/images/YozmaTech-timetracker-logo-white-512.png';

// Surrounds child form with YozmaTech branding
function LandingFormFrame(props) {
    const theme = useTheme();

    const colors = theme.light()
        ? {
              text: deepOrange[700],
              accent: blueGrey[600]
          }
        : {
              text: deepOrange[500],
              accent: theme.palette.grey[50]
          };

    // const logo = theme.light() ? YozmaTechTimeTrackerLogo : YozmaTechTimeTrackerLogoWhite;

    return (
        <Box maxWidth={360} p={2}>
            <Box display="flex" alignItems="center" flexDirection="column">
                {/* <img src={logo} alt="YozmaTech TimeTracker logo" style={{ width: 64 }} /> */}
                <Typography
                    variant="h4"
                    style={{
                        marginTop: theme.spacing(2),
                        color: colors.text,
                        fontWeight: 300,
                        fontSize: '1.75rem'
                    }}
                >
                    YozmaTech <span style={{ color: colors.accent, fontWeight: 400 }}>Time</span>Tracker
                </Typography>
            </Box>

            <Box marginTop={2}>{props.children}</Box>
        </Box>
    );
}

export default LandingFormFrame;
