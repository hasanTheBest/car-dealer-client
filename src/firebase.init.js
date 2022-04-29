import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKUunimXTmIv7PyQ1K9S-yKzX1_Bfx7ds",
  authDomain: "car-dealer-assignment.firebaseapp.com",
  projectId: "car-dealer-assignment",
  storageBucket: "car-dealer-assignment.appspot.com",
  messagingSenderId: "362265159363",
  appId: "1:362265159363:web:e344f9ceab605b50872476",
};

/* const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
}; */

// Initialize Firebase
const auth = getAuth(initializeApp(firebaseConfig));
export default auth;
