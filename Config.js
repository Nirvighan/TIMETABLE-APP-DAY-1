import firebase from 'firebase';
require ('@firebase/firestore')

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAN-RhPa0mqTfDdOyeewFq8n3Hgwxi6LXo",
    authDomain: "timetable-app-9bbae.firebaseapp.com",
    databaseURL: "https://timetable-app-9bbae.firebaseio.com",
    projectId: "timetable-app-9bbae",
    storageBucket: "timetable-app-9bbae.appspot.com",
    messagingSenderId: "895724188380",
    appId: "1:895724188380:web:f87dab729de483f452fa19"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();