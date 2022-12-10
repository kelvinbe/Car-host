import admin from "firebase-admin";
import { cert, ServiceAccount } from "firebase-admin/app";
import _serviceAccount from "./serviceAccountkey.json";



const fb_admin =admin.apps.length ? admin.app() :
admin.initializeApp({
    credential: cert(_serviceAccount as ServiceAccount)
});

const auth = fb_admin.auth();

export { auth };