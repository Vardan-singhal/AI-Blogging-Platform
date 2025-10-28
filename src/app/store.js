import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../services/auth/authSlice"; // ✅ correct
import blogReducer from "../services/blogs/blogSlice";
import aiReducer from "../services/ai/aiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    ai: aiReducer,
  },
});
