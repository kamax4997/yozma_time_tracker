import _ from 'lodash';

export function getInitialValues(project) {
    if (_.isNil(project)) {
        return {
            name: ''
        };
    } else {
        return {
            name: project.name
        };
    }
}

export function orderAndFilterAndPopulateProjects(members, trackers, showArchived) {
    const filteredProjects = showArchived ? members : _.filter(members, p => !p.archived);
    const orderedProjects = _.orderBy(filteredProjects, p => p.created_at.toDate(), 'desc');
    orderedProjects.forEach(project => (project.total_time = 0));
    
    trackers.forEach(tracker => {
        const project = _.find(orderedProjects, p => p.id === tracker.project_uid.id);
        if (!_.isNil(project)) {
            project.total_time += tracker.time;
        }
    });

    return orderedProjects;
}
