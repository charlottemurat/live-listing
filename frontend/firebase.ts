// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPr0t6-OzzDt7-Hl0BsNedOqaFfyDgAZc",
  authDomain: "live-listing.firebaseapp.com",
  projectId: "live-listing",
  storageBucket: "live-listing.firebasestorage.app",
  messagingSenderId: "941704027119",
  appId: "1:941704027119:web:973e3465eeb3c6ab78341a",
  measurementId: "G-7M9QRH9SZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };