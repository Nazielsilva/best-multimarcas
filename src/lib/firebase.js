import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmsb336dunZ4oKcOqaf1C5mkjD9f2nY2M",
  authDomain: "best-multimarcas.firebaseapp.com",
  projectId: "best-multimarcas",
  storageBucket: "best-multimarcas.firebasestorage.app",
  messagingSenderId: "352527039621",
  appId: "1:352527039621:web:15a49b9b07b8f6df22fdec",
  measurementId: "G-ZHFNTV5PBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
