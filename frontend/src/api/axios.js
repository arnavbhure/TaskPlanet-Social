import axios from "axios";
import store from "../store/index";
import { isLoggedInActions } from "../store/user/isLoginSlice";
import { userActions } from "../store/user/userSlice";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    // IMPORTANT: do NOT force Content-Type for multipart/form-data.
    // Axios will set the proper Content-Type + boundary when the request body is FormData.
    "Content-Type": undefined,
  },
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(isLoggedInActions.removeLoginState());
      store.dispatch(userActions.clearUserInfo());
    }

    return Promise.reject(error);
  },
);

export default api;
