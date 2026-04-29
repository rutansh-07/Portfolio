import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLXzrzsQJD2BM1R0DXc2n_dp6iON3IbVU",
  authDomain: "rutansh-portfolio.firebaseapp.com",
  projectId: "rutansh-portfolio",
  storageBucket: "rutansh-portfolio.firebasestorage.app",
  messagingSenderId: "729993452620",
  appId: "1:729993452620:web:e748245fc863fdb26be8e9",
};

// Prevent duplicate initialization in Next.js dev (hot reload)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
