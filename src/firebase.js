// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgflS0jgKwxQdut2kRlSLNsw_djgOE7r0",
  authDomain: "auto-drive-project-80770.firebaseapp.com",
  projectId: "auto-drive-project-80770",
  storageBucket: "auto-drive-project-80770.firebasestorage.app",
  messagingSenderId: "195342843369",
  appId: "1:195342843369:web:9bdfd6f98a0f9715f5df78",
  measurementId: "G-CWR6G0LB0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
