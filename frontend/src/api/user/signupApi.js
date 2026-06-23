import api from "../axios";

const signupApi = async (data) => {
  const response = await api.post("/auth/signup", data);
  console.log("Signup API response:", response.data);
  return response.data;
};

export default signupApi;
