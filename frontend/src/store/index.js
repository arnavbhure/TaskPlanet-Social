import { configureStore } from "@reduxjs/toolkit";
import isLoggedInReducer from "./user/isLoginSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    isLoggedIn: isLoggedInReducer,
    user: userReducer,
  },
});

export default store;
