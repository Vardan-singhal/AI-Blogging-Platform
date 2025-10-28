import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAISuggestions } from "./aiService";

export const fetchAISuggestions = createAsyncThunk(
  "ai/fetchAISuggestions",
  async (interests, thunkAPI) => {
    try {
      const response = await getAISuggestions(interests);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    aiSuggestions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAISuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAISuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.aiSuggestions = action.payload;
      })
      .addCase(fetchAISuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default aiSlice.reducer;
