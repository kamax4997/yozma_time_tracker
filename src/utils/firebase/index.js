import React from 'react';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import useFirebaseAuth from './useFirebaseAuth';
import useDbUser from './useDbUser';
import useDbMembers from './useDbMembers';
import useDbTrackers from './useDbTrackers';

const firebaseConfig = {
    apiKey: "AIzaSyBD49B5ZWp1pBlcAG4_DF8NXcgI4ueHV30",
    authDomain: "yozmatech-bf7b2.firebaseapp.com",
    projectId: "yozmatech-bf7b2",
    storageBucket: "yozmatech-bf7b2.appspot.com",
    messagingSenderId: "261419339091",
    appId: "1:261419339091:web:f90f183f2a8f5d35f165a6",
    measurementId: "G-85K61T93JP",
    databaseURL: "https://yozmatech-bf7b2.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
console.info('%cFirebase initialized', 'color: blue');

// Subsequent queries will use persistence, if it was enabled successfully
firebase
    .firestore()
    .enablePersistence()
    .catch(err => {
        console.error('Firestore persistence failed', err);
        if (err.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled in one tab at a a time
            // TODO: handle Firestore persistence error: failed-precondition
        } else if (err.code === 'unimplemented') {
            // The current browser does not support all of the features required to enable persistence
            // TODO: handle Firestore persistence error: unimplemented
        }
    });

// Firebase
export default firebase;

// Constants
export const db = firebase.firestore();

// Hooks
export { useFirebaseAuth };
export { useDbUser };
export { useDbMembers };
export { useDbTrackers };

// Contexts
export const AuthUserContext = React.createContext(null);
export const DbUserContext = React.createContext(null);
export const DbMembersContext = React.createContext(null);
export const DbTrackersContext = React.createContext(null);

// Helper functions
export const generateCredential = password =>
    firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, password);
