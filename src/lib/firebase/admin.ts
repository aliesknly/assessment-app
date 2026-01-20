import { ENVIROMENTS } from "@/config/env";
import {
  initializeApp,
  getApps,
  cert,
  App,
  applicationDefault,
} from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";

// Initialize Firebase Admin only on server
let app: App;
let serverAuth: Auth;

if (typeof window === "undefined") {
  // Server-side only
  const useServiceAccount =
    ENVIROMENTS.firebase.privateKey && ENVIROMENTS.firebase.clientEmail;

  app =
    getApps().length === 0
      ? initializeApp({
          credential: useServiceAccount
            ? cert({
                projectId: ENVIROMENTS.firebase.projectId,
                privateKey: ENVIROMENTS.firebase.privateKey!.replace(
                  /\\n/g,
                  "\n",
                ),
                clientEmail: ENVIROMENTS.firebase.clientEmail!,
              })
            : applicationDefault(),
          projectId: ENVIROMENTS.firebase.projectId,
        })
      : getApps()[0];

  serverAuth = getAuth(app);
}

export { serverAuth };
