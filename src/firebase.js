// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANGiMUVA7-pk9zjyLqRrUh3PK7VbMRyqE",
  authDomain: "cms-portal-1e971.firebaseapp.com",
  projectId: "cms-portal-1e971",
  storageBucket: "cms-portal-1e971.appspot.com",
  messagingSenderId: "184346804282",
  appId: "1:184346804282:web:a8ce41d8fc74e43b203503",
  measurementId: "G-RHWSRDBQWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

const db = getFirestore(app)

export {db, auth}