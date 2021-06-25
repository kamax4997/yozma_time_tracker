import React from 'react';

import { useTheme } from '@material-ui/core/styles';

function MemberName(props) {
	const { member } = props;
	
	const theme = useTheme();
	
	if (member) {
		return <span>{member.name}</span>;
	} else {
		return <span style={{ color: theme.palette.text.disabled }}>[Deleted Project]</span>;
	}
}

export default MemberName;