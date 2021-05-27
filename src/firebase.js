import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4qEYkv3RFX0mNSwpxu6rJj4VH0o7OI7k",
  authDomain: "chatter-632e5.firebaseapp.com",
  projectId: "chatter-632e5",
  storageBucket: "chatter-632e5.appspot.com",
  messagingSenderId: "492225332374",
  appId: "1:492225332374:web:9f2d30e9471ab29b452eb7",
  measurementId: "G-8MLJJNSYC6",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
