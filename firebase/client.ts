
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC697Zlyn5zH37BQxv_kddQ-bcTjqzTSE8",
  authDomain: "prepwise-1f861.firebaseapp.com",
  projectId: "prepwise-1f861",
  storageBucket: "prepwise-1f861.firebasestorage.app",
  messagingSenderId: "347932735551",
  appId: "1:347932735551:web:415e6492b8e6185ff6608a",
  measurementId: "G-JBEE12LJG2"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)