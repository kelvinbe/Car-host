import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { API_KEY, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET, APP_ID } from "@env"
import { getReactNativePersistence, initializeAuth, Auth, getAuth } from 'firebase/auth/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
  apiKey: "AIzaSyBtSyBDJ2gpo3ibkYmXaCxQ5tEPl_fOxKg",
  authDomain: "gari-chap-mobile.firebaseapp.com",
  projectId: "gari-chap-mobile",
  storageBucket: "gari-chap-mobile.appspot.com",
  messagingSenderId: "508914406372",
  appId: "1:508914406372:web:0b4c07f4acc3649b6fadf1",
  measurementId: "G-G12MS5NLRF"
};

let app: FirebaseApp;
let auth: Auth;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig, "divvly");
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence({
      getItem(...args){
        // console.log("getting item:: ",...args)
        return AsyncStorage.getItem(...args)
      },
      setItem(...args){
        // console.log("setting items:: ", ...args)
        return AsyncStorage.setItem(...args)
      },
      removeItem(...args){
        // console.log("removing items:: ", ...args)
        return AsyncStorage.removeItem(...args)
      }
    }),
  });
} else {
  app = getApp();
  console.log("replacing::", app.name)
  console.log("initializing auth")
  auth = getAuth(app);
}

export { app, auth };
