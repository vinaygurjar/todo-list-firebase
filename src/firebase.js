// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZisiR8G9Q9Gl06SIJV-zfJxjq9uKR2ss",
  authDomain: "todo-list-767c6.firebaseapp.com",
  databaseURL: "https://todo-list-767c6-default-rtdb.firebaseio.com",
  projectId: "todo-list-767c6",
  storageBucket: "todo-list-767c6.appspot.com",
  messagingSenderId: "622203688861",
  appId: "1:622203688861:web:79cdbd92b6eaed2ceb8174"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();