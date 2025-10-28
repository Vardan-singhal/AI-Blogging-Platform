import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as blogService from "./blogService";

export const fetchBlogs = createAsyncThunk("blogs/fetch", blogService.getAll);
export const addBlog = createAsyncThunk("blogs/add", blogService.create);

const blogSlice = createSlice({
  name: "blogs",
  initialState: { items: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default blogSlice.reducer;
