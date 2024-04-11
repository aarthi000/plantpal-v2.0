// import firebase from 'firebase/app'
// import 'firebase/auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdX6OsQvDX0KaiGz6u5VOHAOdYVFUks70",
  authDomain: "plantpal-788c3.firebaseapp.com",
  databaseURL: "https://plantpal-788c3-default-rtdb.firebaseio.com",
  projectId: "plantpal-788c3",
  storageBucket: "plantpal-788c3.appspot.com",
  messagingSenderId: "455282569302",
  appId: "1:455282569302:web:6c77f58088dbc54ae20bf7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export default app;