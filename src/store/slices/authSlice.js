import { createSlice } from "@reduxjs/toolkit";

const stored = localStorage.getItem("em_user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: stored ? JSON.parse(stored) : null,
    isAuthenticated: !!stored,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("em_user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("em_user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;