import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

firebase.initializeApp({
  apiKey: "AIzaSyDDunkau0Iv-t9wqPatB2lpIRh_UedLvmI",
  authDomain: "uasresep-ddcda.firebaseapp.com",
  databaseURL: "https://uasresep-ddcda-default-rtdb.firebaseio.com",
  projectId: "uasresep-ddcda",
  storageBucket: "uasresep-ddcda.appspot.com",
  messagingSenderId: "1077157690944",
  appId: "1:1077157690944:web:195dcfef617050d73ce9a5",
});

const FIREBASE = firebase;

export default FIREBASE;
