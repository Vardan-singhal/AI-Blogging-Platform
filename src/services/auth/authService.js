// src/services/authService.js
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getIdToken,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../../firebaseConfig";

export const authService = {
  signupWithEmail: async (email, password) => {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // optionally update profile here
    return userCred.user; // Firebase User object
  },

  loginWithEmail: async (email, password) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    return userCred.user;
  },

  loginWithGoogle: async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  },

  loginWithGithub: async () => {
    const result = await signInWithPopup(auth, githubProvider);
    return result.user;
  },

  logout: async () => {
    await signOut(auth);
  },

  getIdToken: async (user) => {
    // returns a Firebase ID token (JWT)
    return user ? await getIdToken(user, /* forceRefresh */ true) : null;
  },

  onAuthChange: (cb) => {
    return onAuthStateChanged(auth, (user) => cb(user));
  },

  getCurrentUser: () => auth.currentUser,
};
