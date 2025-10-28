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
  // 🔹 Get currently logged-in user from Firebase
  getCurrentUser() {
    return auth.currentUser || JSON.parse(localStorage.getItem("user"));
  },

  // 🔹 Create user with email/password
  signupWithEmail: async (email, password) => {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCred.user;
    authService.setUser(user); // store in localStorage
    return user;
  },

  // 🔹 Login with email/password
  loginWithEmail: async (email, password) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    authService.setUser(user); // store in localStorage
    return user;
  },

  // 🔹 Login with Google
  loginWithGoogle: async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    authService.setUser(user); // store in localStorage
    return user;
  },

  // 🔹 Login with GitHub
  loginWithGithub: async () => {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    authService.setUser(user); // store in localStorage
    return user;
  },

  // 🔹 Logout
  logout: async () => {
    await signOut(auth);
    authService.clearUser(); // remove from localStorage
  },

  // 🔹 Get Firebase ID token
  getIdToken: async (user) => {
    return user ? await getIdToken(user, true) : null;
  },

  // 🔹 Firebase Auth listener
  onAuthChange: (cb) => {
    return onAuthStateChanged(auth, (user) => {
      if (user) authService.setUser(user);
      else authService.clearUser();
      cb(user);
    });
  },

  // 🔹 LocalStorage management
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  updateLocalUser(updatedUser) {
    localStorage.setItem("user", JSON.stringify(updatedUser));
  },

  clearUser() {
    localStorage.removeItem("user");
  },
};
