import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite'


const firebaseConfig = {
  apiKey: "AIzaSyCiW5L-q-N2SgjsrhynuZP4yOBZEuFBxUQ",
  authDomain: "caravan-123.firebaseapp.com",
  projectId: "caravan-123",
  storageBucket: "caravan-123.appspot.com",
  messagingSenderId: "233759030763",
  appId: "1:233759030763:web:c5acb5faec977a4a54adae"
};

const app = initializeApp(firebaseConfig);

export const auth  = getAuth(app);
export const db = getFirestore(app)