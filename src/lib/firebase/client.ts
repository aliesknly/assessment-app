import { ENVIROMENTS } from "@/config/env";
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const app = !getApps().length
  ? initializeApp(ENVIROMENTS.firebase as FirebaseOptions)
  : getApp();
const auth = getAuth(app);

export { app, auth };

if (ENVIROMENTS.isDev && ENVIROMENTS.useFirebaseEmulator) {
  if (typeof window !== "undefined") {
    connectAuthEmulator(auth, ENVIROMENTS.firebase.emulator.authHost as string);
  }
}
