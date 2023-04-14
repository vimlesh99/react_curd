import { initializeApp } from "firebase/app";
import {getFirestore}  from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBjw2w3Tk80EPDoonAtBHBX9y-hap-EMdQ",
  authDomain: "react-login-form-ts1.firebaseapp.com",
  projectId: "react-login-form-ts1",
  storageBucket: "react-login-form-ts1.appspot.com",
  messagingSenderId: "857977251488",
  appId: "1:857977251488:web:bf2f382065f61fb82d0bc5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);