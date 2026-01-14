import { initializeApp, getApps, cert, App, applicationDefault } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";

// Initialize Firebase Admin only on server
let app: App;
let auth: Auth;

if (typeof window === 'undefined') {
  // Server-side only
  const useServiceAccount = process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL;

  app = getApps().length === 0
    ? initializeApp({
        credential: useServiceAccount ? cert({
          projectId: "assessmet-a943f",
          privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        }) : applicationDefault(),
        projectId: "assessmet-a943f",
      })
    : getApps()[0];

  auth = getAuth(app);
}

export { auth };