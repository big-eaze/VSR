// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD7vKJWS_yC5vZdz-FP7ZG4COOq5YqYyqw",
  authDomain: "virtual-styling-assistan-53652.firebaseapp.com",
  projectId: "virtual-styling-assistan-53652",
  storageBucket: "virtual-styling-assistan-53652.firebasestorage.app",
  messagingSenderId: "693926859659",
  appId: "1:693926859659:web:6fda92928bb8fdd1f7958e",
  measurementId: "G-3VLNK4P66C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Add these exports
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; // optional, but fine to keep
