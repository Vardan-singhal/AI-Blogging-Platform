// src/services/uploadService.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseConfig"; // ensure you exported app from firebaseConfig.js

const storage = getStorage(app);

export const uploadImage = async (file) => {
  const storageRef = ref(storage, `blogImages/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};
