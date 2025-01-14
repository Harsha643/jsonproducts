// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import{getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import{getFirestore, setDoc,doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGWDuPyF75uJQSW5y2JLf-82fO4x-3v7M",
  authDomain: "login-form-412c8.firebaseapp.com",
  projectId: "login-form-412c8",
  storageBucket: "login-form-412c8.firebasestorage.app",
  messagingSenderId: "713181481479",
  appId: "1:713181481479:web:c45d0697c47938d28638a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
