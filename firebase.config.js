// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite'
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiW5L-q-N2SgjsrhynuZP4yOBZEuFBxUQ",
  authDomain: "caravan-123.firebaseapp.com",
  projectId: "caravan-123",
  storageBucket: "caravan-123.appspot.com",
  messagingSenderId: "233759030763",
  appId: "1:233759030763:web:c5acb5faec977a4a54adae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)