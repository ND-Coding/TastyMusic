import firebase from 'firebase/app'
import 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCLiQnZtpR097NmNA7ys7H0oM2MenyLFSg",
    authDomain: "tasty-music.firebaseapp.com",
    projectId: "tasty-music",
    storageBucket: "tasty-music.appspot.com",
    messagingSenderId: "835600654268",
    appId: "1:835600654268:web:60fc855cd3be3638c455b9",
    measurementId: "G-6K87QKKNQH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
export default firebase;
