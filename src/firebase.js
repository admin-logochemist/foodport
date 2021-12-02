// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase";
import 'firebase/auth'
import 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2M9s62xSnCh4CuN7IGivm57xYyqkZ7b4",
  authDomain: "foodport-87389.firebaseapp.com",
  projectId: "foodport-87389",
  storageBucket: "foodport-87389.appspot.com",
  messagingSenderId: "493373194476",
  appId: "1:493373194476:web:7f3304d6613df91a91e5c9"
};

// Initialize Firebase
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const projectStorage=firebase.storage();
export  {db,auth,provider,projectStorage};