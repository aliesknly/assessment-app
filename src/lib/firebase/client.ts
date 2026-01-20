import { ENVIROMENTS } from "@/config/env";
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

//config console firebase
const firebaseConfig: FirebaseOptions = {
  apiKey: ENVIROMENTS.firebase.apiKey,
  authDomain: ENVIROMENTS.firebase.authDomain,
  projectId: ENVIROMENTS.firebase.projectId,
  storageBucket: ENVIROMENTS.firebase.storeBucket,
  messagingSenderId: ENVIROMENTS.firebase.messageSenderId,
  appId: ENVIROMENTS.firebase.appId,
  measurementId: ENVIROMENTS.firebase.measurementId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
