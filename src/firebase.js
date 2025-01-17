
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_Auth_Domain,
  projectId: import.meta.env.VITE_Project_Id,
  storageBucket: import.meta.env.VITE_Strage_Bucket,
  messagingSenderId: import.meta.env.VITE_Message_Sender,
  appId: import.meta.env.VITE_App_Id,
  measurementId:import.meta.env.VITE_Measurement_Id
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider()
export const auth=getAuth(app)
export const db =getFirestore(app)