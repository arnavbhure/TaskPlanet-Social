import api from "../axios";

const getMeApi = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

const logoutApi = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export { getMeApi, logoutApi };
