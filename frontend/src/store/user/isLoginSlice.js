import { createSlice } from "@reduxjs/toolkit";

const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState: false,
  reducers: {
    setLoginState: () => true,
    removeLoginState: () => false,
  },
});

export default isLoggedInSlice.reducer;
export const isLoggedInActions = isLoggedInSlice.actions;
