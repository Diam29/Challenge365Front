import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAhkGWMp2XxYun1Fip5WQ99hcbiziidw0o",
  authDomain: "challenge-365-ccb76.firebaseapp.com",
  projectId: "challenge-365-ccb76",
  storageBucket: "challenge-365-ccb76.appspot.com",
  messagingSenderId: "481094986212",
  appId: "1:481094986212:web:b6e3b138f19e817d89bff1",
  persistence: "none"
};

const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase)