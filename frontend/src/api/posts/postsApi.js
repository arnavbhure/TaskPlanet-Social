import api from "../axios";

const createPostApi = async (formData) => {
  const response = await api.post("/posts", formData, {
    withCredentials: true,
  });

  return response.data;
};

export { createPostApi };
