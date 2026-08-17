// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1zqUjIbdabvsnl-D5V4OUK7Ci2GH_K88",
  authDomain: "expensify-73500.firebaseapp.com",
  projectId: "expensify-73500",
  storageBucket: "expensify-73500.firebasestorage.app",
  messagingSenderId: "1026656412504",
  appId: "1:1026656412504:web:41e8736212943b9c11fb2d",
  measurementId: "G-0CKD4MKNN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);