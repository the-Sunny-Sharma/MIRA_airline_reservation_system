import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAtwzmKx-tYsX_iU6dotJxa88R8nl8X_Bw",
  authDomain: "airline-reservation-syst-8768e.firebaseapp.com",
  projectId: "airline-reservation-syst-8768e",
  storageBucket: "airline-reservation-syst-8768e.appspot.com",
  messagingSenderId: "106236401255",
  appId: "1:106236401255:web:bdc9727226df09427526c2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {app, auth, provider};