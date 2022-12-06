// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0MxidIh_kBkGMR6i0KehL88N11Xq17Qo",
  authDomain: "divvly-61ce8.firebaseapp.com",
  projectId: "divvly-61ce8",
  storageBucket: "divvly-61ce8.appspot.com",
  messagingSenderId: "564464808856",
  appId: "1:564464808856:web:a5603b554e340309bab1ed"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return app;
};