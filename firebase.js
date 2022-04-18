import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1Q9oHyAzr9t8Oama_SuoSITEMkYkBH7g",
  authDomain: "woc-project-d27e5.firebaseapp.com",
  projectId: "woc-project-d27e5",
  storageBucket: "woc-project-d27e5.appspot.com",
  messagingSenderId: "521856568761",
  appId: "1:521856568761:web:b67bdd466f001850dc3a68",
  measurementId: "G-JHSJLL8BR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)