import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { app } from "../firebaseConfig";

const db = getFirestore(app);

// Update role in Firestore
export const updateUserRole = async (uid, role) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, { role });
};
