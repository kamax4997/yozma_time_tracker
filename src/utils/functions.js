import _ from 'lodash';

export function populateTrackers(trackers, members) {
    if (_.isNil(trackers) || _.isNil(members)) {
        return [];
    }

    const trackersPopulated = trackers.map(tracker => ({
        ...tracker,
        member: _.find(members, p => p.id === tracker.project_uid.id)
    }));

    trackersPopulated.forEach(tracker => {
        if (!_.isNil(tracker.member)) {
            _.set(tracker, 'member.id', tracker.project_uid.id);
        }
    });

    return trackersPopulated;
}
