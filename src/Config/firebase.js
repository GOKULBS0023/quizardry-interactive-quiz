import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCvpNqYsVEjNy6N_Uq9NhrimB8uhIBYHnM",
  authDomain: "interactive-quiz-40745.firebaseapp.com",
  projectId: "interactive-quiz-40745",
  storageBucket: "interactive-quiz-40745.appspot.com",
  messagingSenderId: "577471083251",
  appId: "1:577471083251:web:05a50c106e74771856fd86",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'it';
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
