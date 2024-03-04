// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkJa-j6GPR3z62GD7f8JyeKtEt5eKqccY",
  authDomain: "carbonfootprint-24f46.firebaseapp.com",
  projectId: "carbonfootprint-24f46",
  storageBucket: "carbonfootprint-24f46.appspot.com",
  messagingSenderId: "847522748451",
  appId: "1:847522748451:web:78f2eb0029b0d5c41af996"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);