import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

console.log(process.env);

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyDXYZAjEwScCOxBBmKoS_1QFoTqaUeMsV4",
  authDomain:
    process.env.REACT_APP_AUTH_DOMAIN || "potable-aa1b9.firebaseapp.com",
  projectId: "potable-aa1b9",
  storageBucket: "potable-aa1b9.appspot.com",
  messagingSenderId: "365390747952",
  appId: "1:365390747952:web:1141e551c385229b2f10f5",
  measurementId: "G-ZXH46XGTWX",
};

export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
