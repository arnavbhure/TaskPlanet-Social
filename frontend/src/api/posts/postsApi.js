import api from "../axios";

// Existing API usage in the app imports from this file.
// We extend it to include like + comment endpoints so components don't need to
// embed axios logic.

const createPostApi = async (formData) => {
  const response = await api.post("/posts", formData, {
    withCredentials: true,
  });

  return response.data;
};

const fetchAllPostsApi = async () => {
  const response = await api.get("/posts", {
    withCredentials: true,
  });

  return response.data;
};

const toggleLikeApi = async (postId) => {
  const response = await api.put(`/posts/${postId}/like`, null, {
    withCredentials: true,
  });

  return response.data;
};

const addCommentApi = async (postId, payload) => {
  const response = await api.post(`/posts/${postId}/comment`, payload, {
    withCredentials: true,
  });

  return response.data;
};

export { createPostApi, fetchAllPostsApi, toggleLikeApi, addCommentApi };
