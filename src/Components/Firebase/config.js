// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhrcCA9d_m_q3SLcOGNqb_Z3sU_Sc2caY",
  authDomain: "party-app-42d5d.firebaseapp.com",
  projectId: "party-app-42d5d",
  storageBucket: "party-app-42d5d.appspot.com",
  messagingSenderId: "68903819245",
  appId: "1:68903819245:web:3d7f6aff30d59594d5b9e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)