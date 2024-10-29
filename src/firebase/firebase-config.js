import firebase from "firebase/app"; // npm i firebase@8.10.0
import 'firebase/firestore';
import 'firebase/auth';
// import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";





const firebaseConfig = {
    apiKey: "AIzaSyAStHIK4wGbizLb9UeGTSNWVH3L6ISsYF0",
    authDomain: "fit-manager-c4486.firebaseapp.com",
    projectId: "fit-manager-c4486",
    storageBucket: "fit-manager-c4486.appspot.com",
    messagingSenderId: "613506430951",
    appId: "1:613506430951:web:f9c689d82a3c63b91bef42"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  
  const db = firebase.firestore();

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


  export {
    db,
    googleAuthProvider,
    firebase,
    // getAuth,
    // signInAnonymously, 
    // onAuthStateChanged
  }