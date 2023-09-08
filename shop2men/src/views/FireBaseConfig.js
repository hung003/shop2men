import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB037K2wit25NJ-zgwnv4Af06KiLkPHNHY",
  authDomain: "shop2men-4f27b.firebaseapp.com",
  projectId: "shop2men-4f27b",
  storageBucket: "shop2men-4f27b.appspot.com",
  messagingSenderId: "550789591704",
  appId: "1:550789591704:web:ffaaed8331bfc23c73d6ed"
};

const app = initializeApp(firebaseConfig);
export const database=getAuth(app)