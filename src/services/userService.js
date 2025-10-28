// src/services/userService.js
import { db } from "../firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

/**
 * Update or set a user's role in Firestore.
 * @param {string} uid - Firebase Auth user ID
 * @param {string} role - Either "Reader" or "Writer"
 */
export const updateUserRole = async (uid, role) => {
  // 🔍 Step 1: Validate input
  if (!uid || !role) {
    console.error("❌ updateUserRole called with invalid parameters:", {
      uid,
      role,
    });
    throw new Error("Missing UID or role");
  }

  try {
    // 🔍 Step 2: Ensure db exists
    if (!db) {
      throw new Error("Firestore database (db) is not initialized.");
    }

    // 🔍 Step 3: Reference user document
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    // 🔍 Step 4: Update or create the document
    if (userSnap.exists()) {
      await updateDoc(userRef, { role, updatedAt: new Date() });
      console.log(`📝 Updated existing user role to: ${role}`);
    } else {
      await setDoc(userRef, { role, createdAt: new Date() });
      console.log(`✅ Created new user document with role: ${role}`);
    }

    // 🔍 Step 5: Return role for local update
    return { uid, role };
  } catch (error) {
    console.error("🔥 Firestore updateUserRole failed:", error.message);
    throw error;
  }
};
