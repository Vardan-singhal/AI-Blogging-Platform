import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Example initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Example async thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    // You can add API call logic here
    return userData;
  }
);

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ✅ Export actions
export const { logout } = authSlice.actions;

// ✅ Export reducer with a *named export*
export const authReducer = authSlice.reducer;
