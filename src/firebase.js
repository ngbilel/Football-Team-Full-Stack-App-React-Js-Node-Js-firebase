import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyADLY0y8peIlvp6S5exZ32ztqkuRTFus0o",
    authDomain: "football-team-4afb6.firebaseapp.com",
    databaseURL: "https://football-team-4afb6.firebaseio.com",
    projectId: "football-team-4afb6",
    storageBucket: "",
    messagingSenderId: "147972687755",
    appId: "1:147972687755:web:326dd13db40ec5f4"
  };

  firebase.initializeApp(firebaseConfig);

  const firebaseDB = firebase.database();
  //Get Matches
  const firebaseMatches= firebaseDB.ref('matches');
  const firebasePromotions= firebaseDB.ref('promotions');

 export {
     firebase,
     firebaseMatches,
     firebasePromotions
 }