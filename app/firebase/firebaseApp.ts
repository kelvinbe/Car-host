import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { loadEnv } from "../utils/utils";


const firebaseConfig = {
  apiKey: loadEnv("NEXT_PUBLIC_apiKey"),
  authDomain: loadEnv("NEXT_PUBLIC_authDomain"),
  projectId: loadEnv("NEXT_PUBLIC_projectId"),
  storageBucket: loadEnv("NEXT_PUBLIC_storageBucket"),
  messagingSenderId: loadEnv("NEXT_PUBLIC_messagingSenderId"),
  appId: loadEnv("NEXT_PUBLIC_appId"),
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

