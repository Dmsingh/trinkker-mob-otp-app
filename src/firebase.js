import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD0LPHFy8DnrTYC6QS1nd0-kBZAhjObybk",
  authDomain: "mobileotp-9b0b4.firebaseapp.com",
  projectId: "mobileotp-9b0b4",
  storageBucket: "mobileotp-9b0b4.appspot.com",
  messagingSenderId: "291655100967",
  appId: "1:291655100967:web:a13880424eda54411dbc02"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase


