import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
export const app = initializeApp({
  apiKey: "AIzaSyCk0abXdZnGN1R2_yVAYRaoK6yqDpzfBeI",
  authDomain: "reactcard-279aa.firebaseapp.com",
  databaseURL: "https://reactcard-279aa-default-rtdb.firebaseio.com",
  projectId: "reactcard-279aa",
  storageBucket: "reactcard-279aa.appspot.com",
  messagingSenderId: "753778362956",
  appId: "1:753778362956:web:d2672ad54101cc3ed702e9",
});
export const bd = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)