////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from 'firebase/firestore';

////////////////////////////////////////////////////////////
// VARIABLES AND CONSTANTS
////////////////////////////////////////////////////////////

// Firebase configuration object containing API keys and other settings required to connect to the Firebase project
const firebaseConfig = {
    apiKey: "AIzaSyA1sANC5YC4MW_cxAZ-6BkzQJC67koJ1XI", 
    authDomain: "fitnessx-5dc81.firebaseapp.com", 
    projectId: "fitnessx-5dc81", 
    storageBucket: "fitnessx-5dc81.firebasestorage.app", 
    messagingSenderId: "269126645619", 
    appId: "1:269126645619:web:d10b8b31226d98e3fcb706", 
    measurementId: "G-9QQ8LYJ9NT" 
};

////////////////////////////////////////////////////////////
// MAIN PROGRAM
////////////////////////////////////////////////////////////

export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = initializeFirestore(FIREBASE_APP, {
    experimentalForceLongPolling: true, 
});