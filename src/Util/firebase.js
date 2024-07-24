import firebase from "firebase/compat/app";
//authentication
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApMwRsEiy91kTwWtGUWbBtxTD1E2133K4",
  authDomain: "clone-c4f4c.firebaseapp.com",
  projectId: "clone-c4f4c",
  storageBucket: "clone-c4f4c.appspot.com",
  messagingSenderId: "935330072326",
  appId: "1:935330072326:web:86a361a7cdc98d3493c087",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
