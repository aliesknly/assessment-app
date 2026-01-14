import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

//config console firebase
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "assessmet-a943f.firebaseapp.com",
  projectId: "assessmet-a943f",
  storageBucket: "assessmet-a943f.firebasestorage.app",
  messagingSenderId: "736403730928",
  appId: "1:736403730928:web:09a6e5578d13b55fb32d35",
  measurementId: "G-48X0J255T3",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };

