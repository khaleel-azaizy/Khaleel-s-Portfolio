// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhHABjGOziZ1U0ZjA4WXWijUCiWEhuPKo",
  authDomain: "my-portfolio-c83e2.firebaseapp.com",
  projectId: "my-portfolio-c83e2",
  storageBucket: "my-portfolio-c83e2.firebasestorage.app",
  messagingSenderId: "593901734671",
  appId: "1:593901734671:web:04230960ebd4356e250c7a",
  measurementId: "G-FZM3MTBNEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
