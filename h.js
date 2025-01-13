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

function showMessage(message, divId){
    var messageDiv=document.getElementById('divId')
    messageDiv.style.display="block"; 
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    alert(divId)
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}



const signUp=document.getElementById("submitSignup")
signUp.addEventListener('click',(event)=>
    {
    event.preventDefault();
    const userName=document.getElementById("username").value;
    const email=document.getElementById("mail").value;
    const passWord=document.getElementById('ps').value;
    const auth=getAuth()
    const db=getFirestore()
    createUserWithEmailAndPassword(auth, email, passWord)
    .then((userCredential) =>{
             const user=userCredential.user;
             const userData={
                userName:userName,
                email:email,
             };

             showMessage('Account Created Suessfully','signUpMessage');


             const docRef=doc(db, "users", user.uid);
             setDoc(docRef,userData)
             .then(()=>{
                   window.Location.herf='index.html';
               })
                   .catch(error=>console.error("error writing document", error))
    })
         .catch((error)=>{
            const errorCode=error.code;
            if(errorCode=='auth/email-already-in-use !!!'){
                showMessage('Email already Exists !!!','signUpMessage')
            }else{
                showMessage('unable to create user','signUpMessage')
            }

                    
    })  

})