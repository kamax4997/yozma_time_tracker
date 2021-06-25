import { useState, useEffect } from 'react';

import firebase, { db } from 'utils/firebase';

const useDbMembers = () => {
    const [membersLoading, setMembersLoading] = useState(true);
    const [membersError, setMembersError] = useState(false);
    const [members, setMembers] = useState(null);

    useEffect(() => {
        const currentUserRef = db.collection('users').doc(firebase.auth().currentUser.uid);
		
        const unsubscribe = db
            .collection('members')
            // .where('owner_uid', '==', currentUserRef)
            .onSnapshot(
                querySnapshot => {
                    let members = [];
                    querySnapshot.forEach(doc => {
						let member = doc.data();
						member.id = doc.id;
                        members.push(member);
                    });
                    setMembers(members);
                    setMembersLoading(false);
					console.info(`%cuseDbMembers: ${querySnapshot.docChanges().length} document(s) read`, 'color: blue');
                },
                err => {
                    setMembersError(err);
                    console.error(err);
                }
            );
        return () => {
            unsubscribe();
            console.info('%cuseDbMembers: unsubscribed', 'color: blue');
        };
    }, []);

    return { membersLoading, membersError, members };
};

export default useDbMembers;
