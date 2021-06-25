import _ from 'lodash';
import moment from 'moment';

import { getHoursFromSeconds, getMinutesFromSeconds } from 'utils/helpers/timeHelper';

export function getInitialValues(trackEntry) {
    if (_.isNil(trackEntry)) {
        return {
            project_uid: '',
            description: '',
            hours: 0,
            minutes: 0
        };
    } else {
        return {
            project_uid: trackEntry.project_uid.id,
            description: trackEntry.description,
            hours: getHoursFromSeconds(trackEntry.time),
            minutes: getMinutesFromSeconds(trackEntry.time)
        };
    }
}

export function getSelectableMembers(trackEntry, members) {
    const filteredProjects = _.filter(members, p => !p.archived || p.id === _.get(trackEntry, 'members_uid.id', null));
    return _.orderBy(filteredProjects, p => p.created_at.toDate(), 'desc');
}

export function filterTrackEntries(trackEntries, weekSelected, weekFormat) {
    if (_.isNil(trackEntries)) {
        return [];
    }

    const dateSelected = moment(weekSelected, weekFormat)
        .startOf('isoWeek')
        .toDate();
    const previousWeekStartDate = parseInt(
        moment(dateSelected)
            .startOf('isoWeek')
            .subtract(7, 'days')
            .format('YYYYMMDD')
    );
    const nextWeekEndDate = parseInt(
        moment(dateSelected)
            .endOf('isoWeek')
            .add(7, 'days')
            .format('YYYYMMDD')
    );

    return _.filter(trackEntries, t => t.date >= previousWeekStartDate && t.date <= nextWeekEndDate);
}
