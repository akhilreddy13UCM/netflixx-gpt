// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUDQ_DVMpyOF_Oo3qF0WiAXx8ZtxPOu-w",
  authDomain: "netflixxgpt-b1403.firebaseapp.com",
  projectId: "netflixxgpt-b1403",
  storageBucket: "netflixxgpt-b1403.appspot.com",
  messagingSenderId: "981079945224",
  appId: "1:981079945224:web:7ff3d0a551adf5787ae1bd",
  measurementId: "G-4R9XBE1MGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();