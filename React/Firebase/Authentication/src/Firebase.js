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
  apiKey: "AIzaSyApN1m00I-EbmbiNUhPJXGRVZ0a4kGBhZE",
  authDomain: "fir-project-eed8a.firebaseapp.com",
  projectId: "fir-project-eed8a",
  storageBucket: "fir-project-eed8a.firebasestorage.app",
  messagingSenderId: "872554880305",
  appId: "1:872554880305:web:4695f934bd3e28a147a410",
  measurementId: "G-B2XC80M9XL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);