import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9Kag11I4Szv1QPy6uOExtERYA9zK8nS8",
  authDomain: "ai-blogsphere.firebaseapp.com",
  projectId: "ai-blogsphere",
  storageBucket: "ai-blogsphere.firebasestorage.app",
  messagingSenderId: "621987395315",
  appId: "1:621987395315:web:3e1305cf5c6f0c44ae6986",
  measurementId: "G-F9JPDYJWWY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore(app);

export { app };
