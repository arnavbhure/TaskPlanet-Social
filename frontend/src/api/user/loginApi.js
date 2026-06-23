import api from "../axios";

const loginApi = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export default loginApi;
