import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBgj1FTwQTRvMqMRl97UAYIBmoW-IoyVIE",
  authDomain: "eatit-fea0d.firebaseapp.com",
  databaseURL: "https://eatit-fea0d.firebaseio.com",
  projectId: "eatit-fea0d",
  storageBucket: "eatit-fea0d.appspot.com",
  messagingSenderId: "457460004665",
  appId: "1:457460004665:web:c62a45c36ed046a427dae8",
  measurementId: "G-S029S9ZPWQ",
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
