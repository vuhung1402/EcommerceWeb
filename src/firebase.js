import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyANsFYCLS9q2T5WCt_kzHtp9Wo8-AyRxXM",
    authDomain: "ecommerceweb-68f40.firebaseapp.com",
    databaseURL: "https://ecommerceweb-68f40-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ecommerceweb-68f40",
    storageBucket: "ecommerceweb-68f40.appspot.com",
    messagingSenderId: "443319226855",
    appId: "1:443319226855:web:a434799ecf08c6423a6d42",
    measurementId: "G-7F9SDLFTYS"
  };


const app = initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage = getStorage(app)

export {app, firestore, storage}  