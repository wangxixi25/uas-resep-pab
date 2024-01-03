import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

firebase.initializeApp({
    apiKey: "AIzaSyASBrjrdVUmB_yHnNa7HyMYDV73jMbjEus",
    authDomain: "finalprojectfix-2ad38.firebaseapp.com",
    projectId: "finalprojectfix-2ad38",
    storageBucket: "finalprojectfix-2ad38.appspot.com",
    messagingSenderId: "399814454216",
    appId: "1:399814454216:web:2003f8bc08ed37ece22efd"
});

const FIREBASE = firebase;

export default FIREBASE;