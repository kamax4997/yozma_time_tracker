import { useState, useEffect } from 'react';

// import moment from 'moment';

import firebase, { db } from 'utils/firebase';

const useDbTrackers = () => {
    const [trackersLoading, setTrackersLoading] = useState(true);
    const [trackersError, setTrackersError] = useState(false);
    const [trackers, setTrackers] = useState(null);
    
    useEffect(() => {
        const currentUserRef = db.collection('users').doc(firebase.auth().currentUser.uid);
        // const date30DaysAgo = parseInt(moment().subtract(30, 'days').format('YYYYMMDD'));
		
        const unsubscribe = db
            .collection('trackers')
            // .where('owner_uid', '==', currentUserRef)
            // .where('date', '>=', date30DaysAgo)
            .onSnapshot(
                querySnapshot => {
                    let trackers = [];
                    querySnapshot.forEach(doc => {
						let track = doc.data();
						track.id = doc.id;
                        trackers.push(track);
                    });
                    setTrackers(trackers);
                    setTrackersLoading(false);
					console.info(`%cuseDbTrackers: ${querySnapshot.docChanges().length} document(s) read`, 'color: blue');
                },
                err => {
                    setTrackersError(err);
                    console.error(err);
                }
            );
        return () => {
            unsubscribe();
            console.info('%cuseDbTrackers: unsubscribed', 'color: blue');
        };
    }, []);

    return { trackersLoading, trackersError, trackers };
};

export default useDbTrackers;
