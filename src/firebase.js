import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDIg6O3XQzy5XQelxNZK9j3va3bqAvYn2U",
  authDomain: "chat-app-23f31.firebaseapp.com",
  projectId: "chat-app-23f31",
  storageBucket: "chat-app-23f31.appspot.com",
  messagingSenderId: "568785692513",
  appId: "1:568785692513:web:8b0f29e50c0b5873b40720"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();