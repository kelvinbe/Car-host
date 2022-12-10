// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0SIb-nS_5aFe12GI8RKzTJw5Qk65hK1A",
  authDomain: "divvly.firebaseapp.com",
  projectId: "divvly",
  storageBucket: "divvly.appspot.com",
  messagingSenderId: "760482109861",
  appId: "1:760482109861:web:304974c2f26876b4d8b04c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return app;
};